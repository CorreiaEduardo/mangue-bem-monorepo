package br.uneb.dcet.si20192.tees.manguebem.api.service;

import br.uneb.dcet.si20192.tees.manguebem.api.dto.ObservationDTO;
import br.uneb.dcet.si20192.tees.manguebem.api.dto.UFReportDTO;
import br.uneb.dcet.si20192.tees.manguebem.api.dto.UFReportItemDTO;
import br.uneb.dcet.si20192.tees.manguebem.api.entity.Biome;
import br.uneb.dcet.si20192.tees.manguebem.api.entity.Observation;
import br.uneb.dcet.si20192.tees.manguebem.api.entity.Specie;
import br.uneb.dcet.si20192.tees.manguebem.api.entity.User;
import br.uneb.dcet.si20192.tees.manguebem.api.entity.enums.ApprovalStatus;
import br.uneb.dcet.si20192.tees.manguebem.api.exception.NotFoundException;
import br.uneb.dcet.si20192.tees.manguebem.api.repository.BiomeRepository;
import br.uneb.dcet.si20192.tees.manguebem.api.repository.ObservationRepository;
import br.uneb.dcet.si20192.tees.manguebem.api.repository.SpecieRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.modelmapper.ModelMapper;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.CompletableFuture;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class ObservationServiceTest {

    @Mock
    private SpecieRepository specieRepository;

    @Mock
    private BiomeRepository biomeRepository;

    @Mock
    private ObservationRepository observationRepository;

    @Mock
    private ModelMapper modelMapper;

    @InjectMocks
    private ObservationService observationService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testCreateAsync() {
        // Arrange
        ObservationDTO observationDTO = new ObservationDTO();
        Observation observation = new Observation();

        when(modelMapper.map(observationDTO, Observation.class)).thenReturn(observation);
        when(observationRepository.save(observation)).thenReturn(observation);
        when(modelMapper.map(observation, ObservationDTO.class)).thenReturn(observationDTO);

        // Act
        CompletableFuture<Void> future = observationService.createAsync(observationDTO);
        future.join(); // Wait for the async method to complete

        // Assert
        verify(observationRepository, times(1)).save(observation);
    }

    @Test
    public void testCalculateUFReport() {
        // Arrange
        String specieId = "123123";
        String bemClassification = "bemClassification";
        List<UFReportItemDTO> items = List.of(new UFReportItemDTO());

        when(observationRepository.countSpeciesByFederativeUnit(specieId, bemClassification)).thenReturn(items);

        // Act
        UFReportDTO result = observationService.calculateUFReport(specieId, bemClassification);

        // Assert
        assertEquals(items, result.getItems());
    }

    @Test
    public void testApprove() {
        User user = new User();
        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(user, null, null);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        Long id = 1L;
        Observation observation = new Observation();
        observation.setId(id);
        ObservationDTO observationDTO = new ObservationDTO();

        when(observationRepository.findById(id)).thenReturn(Optional.of(observation));
        when(modelMapper.map(observationDTO, Observation.class)).thenReturn(observation);
        when(modelMapper.map(observation, ObservationDTO.class)).thenReturn(observationDTO);

        ObservationDTO result = observationService.approve(id);

        assertNotNull(result);
        assertEquals(observationDTO, result);
        verify(observationRepository).save(observation);
        assertEquals(ApprovalStatus.APPROVED, observation.getApprovalStatus());
        assertEquals(user, observation.getRevisedBy());
    }

    @Test
    public void testReprove() {
        User user = new User();
        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(user, null, null);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        Long id = 1L;
        Observation observation = new Observation();
        observation.setId(id);
        ObservationDTO observationDTO = new ObservationDTO();

        when(observationRepository.findById(id)).thenReturn(Optional.of(observation));
        when(modelMapper.map(observationDTO, Observation.class)).thenReturn(observation);
        when(modelMapper.map(observation, ObservationDTO.class)).thenReturn(observationDTO);

        ObservationDTO result = observationService.reprove(id);

        assertNotNull(result);
        assertEquals(observationDTO, result);
        verify(observationRepository).save(observation);
        assertEquals(ApprovalStatus.REJECTED, observation.getApprovalStatus());
        assertEquals(user, observation.getRevisedBy());
    }

    @Test
    public void testConvertToDto() {
        // Arrange
        Observation observation = new Observation();
        ObservationDTO observationDTO = new ObservationDTO();

        when(modelMapper.map(observation, ObservationDTO.class)).thenReturn(observationDTO);

        // Act
        ObservationDTO result = observationService.convert(observation);

        // Assert
        assertEquals(observationDTO, result);
    }

    @Test
    public void testConvertToEntity() {
        // Arrange
        ObservationDTO observationDTO = new ObservationDTO();
        observationDTO.setSpecieId(123123l);
        observationDTO.setBiomeId(123123l);

        Observation observation = new Observation();
        Specie specie = new Specie();
        Biome biome = new Biome();

        when(modelMapper.map(observationDTO, Observation.class)).thenReturn(observation);
        when(specieRepository.findById(123123l)).thenReturn(Optional.of(specie));
        when(biomeRepository.findById(123123l)).thenReturn(Optional.of(biome));

        // Act
        Observation result = observationService.convert(observationDTO);

        // Assert
        assertEquals(observation, result);
        assertEquals(specie, result.getSpecie());
        assertEquals(biome, result.getBiome());
    }

    @Test
    public void testConvertToEntitySpecieNotFound() {
        // Arrange
        ObservationDTO observationDTO = new ObservationDTO();
        observationDTO.setSpecieId(123123l);

        when(specieRepository.findById(123123l)).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(NotFoundException.class, () -> observationService.convert(observationDTO));
    }

    @Test
    public void testConvertToEntityBiomeNotFound() {
        // Arrange
        ObservationDTO observationDTO = new ObservationDTO();
        observationDTO.setBiomeId(123123l);

        when(biomeRepository.findById(123123l)).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(NotFoundException.class, () -> observationService.convert(observationDTO));
    }
}