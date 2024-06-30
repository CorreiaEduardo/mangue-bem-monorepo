package br.uneb.dcet.si20192.tees.manguebem.api.service;

import br.uneb.dcet.si20192.tees.manguebem.api.dto.CreateSpecieDTO;
import br.uneb.dcet.si20192.tees.manguebem.api.dto.SpecieDTO;
import br.uneb.dcet.si20192.tees.manguebem.api.entity.Biome;
import br.uneb.dcet.si20192.tees.manguebem.api.entity.Observation;
import br.uneb.dcet.si20192.tees.manguebem.api.entity.Specie;
import br.uneb.dcet.si20192.tees.manguebem.api.repository.SpecieRepository;
import br.uneb.dcet.si20192.tees.manguebem.api.service.basic.BaseService;
import br.uneb.dcet.si20192.tees.manguebem.integration.inaturalist.dto.ShowTaxon;
import br.uneb.dcet.si20192.tees.manguebem.integration.inaturalist.response.TaxonSearchResponse;
import br.uneb.dcet.si20192.tees.manguebem.integration.inaturalist.service.INaturalistService;
import br.uneb.dcet.si20192.tees.manguebem.integration.iucnredlist.dto.IUCNSpecieSearchResult;
import br.uneb.dcet.si20192.tees.manguebem.integration.iucnredlist.service.IUCNRedlistService;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.util.MultiValueMap;

@Slf4j
@Service
public class SpecieService extends BaseService<Specie, SpecieDTO> {

    private final Boolean skipIUCNCalculation;

    private final SpecieRepository specieRepository;
    private final INaturalistService iNaturalistService;
    private final IUCNRedlistService iucnRedlistService;
    private final ModelMapper modelMapper;

    public SpecieService(@Value("${api.parameters.integration.iucnredlist.skip:true}") Boolean skipIUCNCalculation,
                         SpecieRepository specieRepository, INaturalistService iNaturalistService,
                         IUCNRedlistService iucnRedlistService, ModelMapper modelMapper) {
        this.skipIUCNCalculation = skipIUCNCalculation;
        this.specieRepository = specieRepository;
        this.iNaturalistService = iNaturalistService;
        this.iucnRedlistService = iucnRedlistService;
        this.modelMapper = modelMapper;
    }

    @Override
    public Class<Specie> getEntityClass() {
        return Specie.class;
    }

    @Override
    protected SpecieRepository getRepository() {
        return this.specieRepository;
    }

    @Async
    public void createAsync(SpecieDTO specieDTO) {
        getRepository().save(convert(specieDTO));
    }

    public SpecieDTO create(CreateSpecieDTO createSpecieDTO) {
        if (!getRepository().existsByINaturalistId(createSpecieDTO.getINaturalistId())) {
            TaxonSearchResponse taxonResponse = iNaturalistService.searchTaxonById(createSpecieDTO.getINaturalistId());

            if (taxonResponse != null && !taxonResponse.getResults().isEmpty()) {
                ShowTaxon taxon = taxonResponse.getResults().get(0);
                final String taxonGenus = taxon.getName().split(" ")[0];
                final String taxonName = taxon.getName().split(" ")[1];

                String iucn = null;
                if (!skipIUCNCalculation) {
                    final IUCNSpecieSearchResult iucnResult = iucnRedlistService.searchSpecie(taxonGenus, taxonName);
                    log.info("IUCN result found was {}", iucnResult == null ? "null" : iucnResult.getCategory());
                    iucn = iucnResult != null ? iucnResult.getCategory() : null;
                }

                final SpecieDTO dto = SpecieDTO
                        .builder()
                        .taxonGenus(taxonGenus)
                        .taxonName(taxonName)
                        .iNaturalistId(createSpecieDTO.getINaturalistId())
                        .IUCN(iucn)
                        .doi(createSpecieDTO.getDOI())
                        .build();

                return create(dto);
            }
        }

        throw new RuntimeException();
    }

    public boolean exists(SpecieDTO dto) {
        return getRepository().existsByTaxon(
                dto.getTaxonKingdom(),
                dto.getTaxonPhylum(),
                dto.getTaxonClass(),
                dto.getTaxonOrder(),
                dto.getTaxonFamily(),
                dto.getTaxonGenus(),
                dto.getTaxonName()
        );
    }

    @Override
    protected Specification<Specie> parseSpecification(MultiValueMap<String, String> parameters) {
        Specification<Specie> specification = super.parseSpecification(parameters);

        if (parameters.containsKey("observations.brazilianFederativeUnit")) {
            final String brazilianFederativeUnitFilter = parameters.getFirst("observations.brazilianFederativeUnit");
            final String brazilianFederativeUnit = parameters.getFirst("observations.brazilianFederativeUnit")
                    .substring(brazilianFederativeUnitFilter.indexOf(":") + 1, brazilianFederativeUnitFilter.length());

            specification = specification == null ? hasObservationWithState(brazilianFederativeUnit) : specification.and(hasObservationWithState(brazilianFederativeUnit));
        }

        if (parameters.containsKey("observations.biome.name")) {
            final String biomeNameFilter = parameters.getFirst("observations.biome.name");
            final String biomeName = parameters.getFirst("observations.biome.name")
                    .substring(biomeNameFilter.indexOf(":") + 1, biomeNameFilter.length());

            specification = specification == null ? hasObservationWithBiome(biomeName) : specification.and(hasObservationWithBiome(biomeName));
        }

        return specification;
    }

    public static Specification<Specie> hasObservationWithState(String brazilianFederativeUnit) {
        return (root, query, criteriaBuilder) -> {
            Join<Specie, Observation> observations = root.join("observations", JoinType.INNER);
            return criteriaBuilder.equal(observations.get("brazilianFederativeUnit"), brazilianFederativeUnit);
        };
    }

    public static Specification<Specie> hasObservationWithBiome(String biomeName) {
        return (root, query, criteriaBuilder) -> {
            Join<Specie, Observation> observations = root.join("observations", JoinType.INNER);
            Join<Observation, Biome> biomes = observations.join("biome", JoinType.INNER);
            return criteriaBuilder.equal(biomes.get("name"), biomeName);
        };
    }

    @Override
    protected SpecieDTO convert(Specie specie) {
        SpecieDTO dto = modelMapper.map(specie, SpecieDTO.class);

        if (specie.getRevisedBy() != null) {
            dto.setReviserEmail(specie.getRevisedBy().getEmail());
        }

        return dto;
    }

    @Override
    protected Specie convert(SpecieDTO specieDTO) {
        return modelMapper.map(specieDTO, Specie.class);
    }
}
