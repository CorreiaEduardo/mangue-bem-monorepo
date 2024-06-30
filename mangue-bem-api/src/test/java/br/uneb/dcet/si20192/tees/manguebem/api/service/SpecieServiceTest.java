package br.uneb.dcet.si20192.tees.manguebem.api.service;

import br.uneb.dcet.si20192.tees.manguebem.api.dto.SpecieDTO;
import br.uneb.dcet.si20192.tees.manguebem.api.entity.Specie;
import br.uneb.dcet.si20192.tees.manguebem.api.entity.User;
import br.uneb.dcet.si20192.tees.manguebem.api.entity.enums.ApprovalStatus;
import br.uneb.dcet.si20192.tees.manguebem.api.repository.SpecieRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.modelmapper.ModelMapper;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class SpecieServiceTest {

    @Mock
    private SpecieRepository specieRepository;

    @Mock
    private ModelMapper modelMapper;

    @InjectMocks
    private SpecieService specieService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testCreateAsync() {
        // Arrange
        SpecieDTO specieDTO = new SpecieDTO();
        Specie specie = new Specie();

        when(modelMapper.map(specieDTO, Specie.class)).thenReturn(specie);

        // Act
        specieService.createAsync(specieDTO);

        // Assert
        verify(specieRepository, times(1)).save(specie);
    }

    @Test
    public void testExists() {
        // Arrange
        SpecieDTO specieDTO = new SpecieDTO();
        specieDTO.setTaxonKingdom("Animalia");
        specieDTO.setTaxonPhylum("Chordata");
        specieDTO.setTaxonClass("Mammalia");
        specieDTO.setTaxonOrder("Primates");
        specieDTO.setTaxonFamily("Hominidae");
        specieDTO.setTaxonGenus("Homo");
        specieDTO.setTaxonName("Homo sapiens");

        when(specieRepository.existsByTaxon(
                specieDTO.getTaxonKingdom(),
                specieDTO.getTaxonPhylum(),
                specieDTO.getTaxonClass(),
                specieDTO.getTaxonOrder(),
                specieDTO.getTaxonFamily(),
                specieDTO.getTaxonGenus(),
                specieDTO.getTaxonName()
        )).thenReturn(true);

        // Act
        boolean result = specieService.exists(specieDTO);

        // Assert
        assertTrue(result);
    }

    @Test
    public void testParseSpecification() {
        // Arrange
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("observations.brazilianFederativeUnit", "eq:SP");

        // Act
        Specification<Specie> specification = specieService.parseSpecification(params);

        // Assert
        assertNotNull(specification);
    }

    @Test
    public void testHasObservationWithState() {
        // Arrange
        String state = "SP";

        // Act
        Specification<Specie> specification = SpecieService.hasObservationWithState(state);

        // Assert
        assertNotNull(specification);
    }

    @Test
    public void testHasObservationWithBiome() {
        // Arrange
        String biomeName = "Amazon";

        // Act
        Specification<Specie> specification = SpecieService.hasObservationWithBiome(biomeName);

        // Assert
        assertNotNull(specification);
    }

    @Test
    public void testApprove() {
        User user = new User();
        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(user, null, null);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        Long id = 1L;
        Specie specie = new Specie();
        specie.setId(id);
        SpecieDTO specieDTO = new SpecieDTO();

        when(specieRepository.findById(id)).thenReturn(Optional.of(specie));
        when(modelMapper.map(specieDTO, Specie.class)).thenReturn(specie);
        when(modelMapper.map(specie, SpecieDTO.class)).thenReturn(specieDTO);

        SpecieDTO result = specieService.approve(id);

        assertNotNull(result);
        assertEquals(specieDTO, result);
        verify(specieRepository).save(specie);
        assertEquals(ApprovalStatus.APPROVED, specie.getApprovalStatus());
        assertEquals(user, specie.getRevisedBy());
    }

    @Test
    public void testReprove() {
        User user = new User();
        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(user, null, null);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        Long id = 1L;
        Specie specie = new Specie();
        specie.setId(id);
        SpecieDTO specieDTO = new SpecieDTO();

        when(specieRepository.findById(id)).thenReturn(Optional.of(specie));
        when(modelMapper.map(specieDTO, Specie.class)).thenReturn(specie);
        when(modelMapper.map(specie, SpecieDTO.class)).thenReturn(specieDTO);

        SpecieDTO result = specieService.reprove(id);

        assertNotNull(result);
        assertEquals(specieDTO, result);
        verify(specieRepository).save(specie);
        assertEquals(ApprovalStatus.REJECTED, specie.getApprovalStatus());
        assertEquals(user, specie.getRevisedBy());
    }

    @Test
    public void testConvertToDto() {
        // Arrange
        Specie specie = new Specie();
        SpecieDTO specieDTO = new SpecieDTO();

        when(modelMapper.map(specie, SpecieDTO.class)).thenReturn(specieDTO);

        // Act
        SpecieDTO result = specieService.convert(specie);

        // Assert
        assertEquals(specieDTO, result);
    }

    @Test
    public void testConvertToEntity() {
        // Arrange
        SpecieDTO specieDTO = new SpecieDTO();
        Specie specie = new Specie();

        when(modelMapper.map(specieDTO, Specie.class)).thenReturn(specie);

        // Act
        Specie result = specieService.convert(specieDTO);

        // Assert
        assertEquals(specie, result);
    }
}