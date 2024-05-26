package br.uneb.dcet.si20192.tees.manguebem.api.job;

import br.uneb.dcet.si20192.tees.manguebem.api.dto.ObservationDTO;
import br.uneb.dcet.si20192.tees.manguebem.api.dto.SpecieDTO;
import br.uneb.dcet.si20192.tees.manguebem.api.service.ObservationService;
import br.uneb.dcet.si20192.tees.manguebem.api.service.SpecieService;
import br.uneb.dcet.si20192.tees.manguebem.integration.specieslink.dto.Feature;
import br.uneb.dcet.si20192.tees.manguebem.integration.specieslink.dto.Geometry;
import br.uneb.dcet.si20192.tees.manguebem.integration.specieslink.dto.SpecieProperties;
import br.uneb.dcet.si20192.tees.manguebem.integration.specieslink.response.SearchSpecieResponse;
import br.uneb.dcet.si20192.tees.manguebem.integration.specieslink.service.SpeciesLinkService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.Arrays;
import java.util.List;

import static org.mockito.Mockito.*;

public class SpeciesLinkObservationJobTest {

    @Mock
    private ObservationService observationService;

    @Mock
    private SpecieService specieService;

    @Mock
    private SpeciesLinkService speciesLinkService;

    @InjectMocks
    private SpeciesLinkObservationJob speciesLinkObservationJob;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testExecute() {
        // Arrange
        SpecieDTO specieDTO = new SpecieDTO();
        specieDTO.setId(123l);
        specieDTO.setSpeciesLinkId("speciesLinkId");

        Page<SpecieDTO> page = new PageImpl<>(List.of(specieDTO), PageRequest.of(0, 1), 1);

        when(specieService.getAll(any(Pageable.class))).thenReturn(page).thenReturn(Page.empty());
        when(speciesLinkService.searchTaxonObservations(eq("speciesLinkId"), anyInt(), anyInt()))
                .thenReturn(new SearchSpecieResponse());

        // Mocking Feature and Geometry
        Feature feature = new Feature();
        Geometry geometry = new Geometry();
        geometry.setCoordinates(Arrays.asList(20.0, 10.0));
        feature.setGeometry(geometry);

        SpecieProperties properties = new SpecieProperties();
        properties.setStateprovince("SP");
        properties.setCatalognumber("12345");
        feature.setProperties(properties);

        SearchSpecieResponse response = new SearchSpecieResponse();
        response.setFeatures(List.of(feature));
        response.setNumberReturned(1);

        when(speciesLinkService.searchTaxonObservations(eq("speciesLinkId"), anyInt(), anyInt())).thenReturn(response);

        // Act
        speciesLinkObservationJob.execute();

        // Assert
        verify(specieService, times(1)).getAll(any(Pageable.class));
    }

    @Test
    public void testExecute_noSpeciesLinkId() {
        // Arrange
        SpecieDTO specieDTO = new SpecieDTO();
        specieDTO.setId(123l);
        specieDTO.setSpeciesLinkId(null);

        Page<SpecieDTO> page = new PageImpl<>(List.of(specieDTO), PageRequest.of(0, 1), 1);

        when(specieService.getAll(any(Pageable.class))).thenReturn(page).thenReturn(Page.empty());

        // Act
        speciesLinkObservationJob.execute();

        // Assert
        verify(specieService, times(1)).getAll(any(Pageable.class));
        verify(speciesLinkService, never()).searchTaxonObservations(anyString(), anyInt(), anyInt());
        verify(observationService, never()).createAsync(any(ObservationDTO.class));
    }
}