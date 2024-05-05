package br.uneb.dcet.si20192.tees.manguebem.api.service;

import br.uneb.dcet.si20192.tees.manguebem.api.dto.SpecieDTO;
import br.uneb.dcet.si20192.tees.manguebem.api.entity.Specie;
import br.uneb.dcet.si20192.tees.manguebem.api.repository.SpecieRepository;
import br.uneb.dcet.si20192.tees.manguebem.api.service.basic.BaseService;
import org.modelmapper.ModelMapper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class SpecieService extends BaseService<Specie, SpecieDTO> {

    private final SpecieRepository specieRepository;
    private final ModelMapper modelMapper;

    public SpecieService(SpecieRepository specieRepository, ModelMapper modelMapper) {
        this.specieRepository = specieRepository;
        this.modelMapper = modelMapper;
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
    protected SpecieDTO convert(Specie specie) {
        return modelMapper.map(specie, SpecieDTO.class);
    }

    @Override
    protected Specie convert(SpecieDTO specieDTO) {
        return modelMapper.map(specieDTO, Specie.class);
    }
}
