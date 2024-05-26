package br.uneb.dcet.si20192.tees.manguebem.api.service;

import br.uneb.dcet.si20192.tees.manguebem.api.dto.SpecieDTO;
import br.uneb.dcet.si20192.tees.manguebem.api.entity.Biome;
import br.uneb.dcet.si20192.tees.manguebem.api.entity.Observation;
import br.uneb.dcet.si20192.tees.manguebem.api.entity.Specie;
import br.uneb.dcet.si20192.tees.manguebem.api.repository.SpecieRepository;
import br.uneb.dcet.si20192.tees.manguebem.api.service.basic.BaseService;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import org.modelmapper.ModelMapper;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.util.MultiValueMap;

@Service
public class SpecieService extends BaseService<Specie, SpecieDTO> {

    private final SpecieRepository specieRepository;
    private final ModelMapper modelMapper;

    public SpecieService(SpecieRepository specieRepository, ModelMapper modelMapper) {
        this.specieRepository = specieRepository;
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
        return modelMapper.map(specie, SpecieDTO.class);
    }

    @Override
    protected Specie convert(SpecieDTO specieDTO) {
        return modelMapper.map(specieDTO, Specie.class);
    }
}
