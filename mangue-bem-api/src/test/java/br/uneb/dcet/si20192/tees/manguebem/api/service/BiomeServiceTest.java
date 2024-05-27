package br.uneb.dcet.si20192.tees.manguebem.api.service;

import br.uneb.dcet.si20192.tees.manguebem.api.dto.BiomeDTO;
import br.uneb.dcet.si20192.tees.manguebem.api.entity.Biome;
import br.uneb.dcet.si20192.tees.manguebem.api.exception.NotFoundException;
import br.uneb.dcet.si20192.tees.manguebem.api.repository.BiomeRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.modelmapper.ModelMapper;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class BiomeServiceTest {

    @Mock
    private BiomeRepository biomeRepository;

    @Mock
    private ModelMapper modelMapper;

    @InjectMocks
    private BiomeService biomeService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetByName() {
        // Arrange
        String biomeName = "Amazon";
        Biome biome = new Biome();
        BiomeDTO biomeDTO = new BiomeDTO();

        when(biomeRepository.findByNameIgnoreCase(biomeName.trim())).thenReturn(Optional.of(biome));
        when(modelMapper.map(biome, BiomeDTO.class)).thenReturn(biomeDTO);

        // Act
        BiomeDTO result = biomeService.getByName(biomeName);

        // Assert
        assertEquals(biomeDTO, result);
    }

    @Test
    public void testGetByNameNotFound() {
        // Arrange
        String biomeName = "NonExistentBiome";

        when(biomeRepository.findByNameIgnoreCase(biomeName.trim())).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(NotFoundException.class, () -> biomeService.getByName(biomeName));
    }

    @Test
    public void testConvert() {
        // Arrange
        Biome biome = new Biome();
        BiomeDTO biomeDTO = new BiomeDTO();

        when(modelMapper.map(biome, BiomeDTO.class)).thenReturn(biomeDTO);

        // Act
        BiomeDTO result = biomeService.convert(biome);

        // Assert
        assertEquals(biomeDTO, result);
    }
}