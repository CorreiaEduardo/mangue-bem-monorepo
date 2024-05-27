package br.uneb.dcet.si20192.tees.manguebem.api.service;

import br.uneb.dcet.si20192.tees.manguebem.api.dto.BiomeDTO;
import br.uneb.dcet.si20192.tees.manguebem.api.entity.Biome;
import br.uneb.dcet.si20192.tees.manguebem.api.exception.NotFoundException;
import br.uneb.dcet.si20192.tees.manguebem.api.repository.BiomeRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
public class BiomeService {

    private final BiomeRepository biomeRepository;
    private final ModelMapper modelMapper;

    public BiomeService(BiomeRepository biomeRepository, ModelMapper modelMapper) {
        this.biomeRepository = biomeRepository;
        this.modelMapper = modelMapper;
    }


    public BiomeDTO getByName(String name) {
        final Biome biome = biomeRepository.findByNameIgnoreCase(name.trim())
                .orElseThrow(NotFoundException::new);

        return convert(biome);
    }

    protected BiomeDTO convert(Biome biome) {
        return modelMapper.map(biome, BiomeDTO.class);
    }
}
