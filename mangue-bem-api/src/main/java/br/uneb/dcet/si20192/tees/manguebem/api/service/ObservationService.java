package br.uneb.dcet.si20192.tees.manguebem.api.service;

import br.uneb.dcet.si20192.tees.manguebem.api.dto.ObservationDTO;
import br.uneb.dcet.si20192.tees.manguebem.api.entity.Biome;
import br.uneb.dcet.si20192.tees.manguebem.api.entity.Observation;
import br.uneb.dcet.si20192.tees.manguebem.api.entity.Specie;
import br.uneb.dcet.si20192.tees.manguebem.api.exception.NotFoundException;
import br.uneb.dcet.si20192.tees.manguebem.api.repository.BiomeRepository;
import br.uneb.dcet.si20192.tees.manguebem.api.repository.ObservationRepository;
import br.uneb.dcet.si20192.tees.manguebem.api.repository.SpecieRepository;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class ObservationService {

    private final SpecieRepository specieRepository;
    private final BiomeRepository biomeRepository;
    private final ObservationRepository observationRepository;
    private final ModelMapper modelMapper;

    public ObservationService(SpecieRepository specieRepository, BiomeRepository biomeRepository, ObservationRepository observationRepository, ModelMapper modelMapper) {
        this.specieRepository = specieRepository;
        this.biomeRepository = biomeRepository;
        this.observationRepository = observationRepository;
        this.modelMapper = modelMapper;
    }

    @Async
    public void createAsync(ObservationDTO observationDTO) {
        save(observationDTO);
    }

    private ObservationDTO save(ObservationDTO dto) {
        final Observation observation = observationRepository.save(convert(dto));
        return convert(observation);
    }

    private ObservationDTO convert(Observation observation) {
        final ObservationDTO dto = modelMapper.map(observation, ObservationDTO.class);

        if (observation.getSpecie() != null) {
            dto.setSpecieId(observation.getSpecie().getId());
        }
        if (observation.getBiome() != null) {
            dto.setBiomeId(observation.getBiome().getId());
        }

        return dto;
    }

    private Observation convert(ObservationDTO dto) {
        final Observation observation = modelMapper.map(dto, Observation.class);

        if (dto.getSpecieId() != null) {
            final Specie specie = specieRepository.findById(dto.getSpecieId())
                    .orElseThrow(NotFoundException::new);
            observation.setSpecie(specie);
        }

        if (dto.getBiomeId() != null) {
            final Biome biome = biomeRepository.findById(dto.getBiomeId())
                    .orElseThrow(NotFoundException::new);
            observation.setBiome(biome);
        }

        return observation;
    }
}
