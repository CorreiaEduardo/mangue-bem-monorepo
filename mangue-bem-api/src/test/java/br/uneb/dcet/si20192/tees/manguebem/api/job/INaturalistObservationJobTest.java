package br.uneb.dcet.si20192.tees.manguebem.api.job;

import br.uneb.dcet.si20192.tees.manguebem.api.dto.ObservationDTO;
import br.uneb.dcet.si20192.tees.manguebem.api.dto.SpecieDTO;
import br.uneb.dcet.si20192.tees.manguebem.api.service.ObservationService;
import br.uneb.dcet.si20192.tees.manguebem.api.service.SpecieService;
import br.uneb.dcet.si20192.tees.manguebem.integration.inaturalist.response.TaxonObservationsResponse;
import br.uneb.dcet.si20192.tees.manguebem.integration.inaturalist.service.INaturalistService;
import br.uneb.dcet.si20192.tees.manguebem.integration.openstreetmap.dto.Address;
import br.uneb.dcet.si20192.tees.manguebem.integration.openstreetmap.response.NominatimResponse;
import br.uneb.dcet.si20192.tees.manguebem.integration.openstreetmap.service.NominatimService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.List;

import static org.mockito.Mockito.*;

public class INaturalistObservationJobTest {

    @Mock
    private ObservationService observationService;

    @Mock
    private SpecieService specieService;

    @Mock
    private INaturalistService iNaturalistService;

    @Mock
    private NominatimService nominatimService;

    @InjectMocks
    private INaturalistObservationJob iNaturalistObservationJob;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testExecute() {
        // Arrange
        SpecieDTO specieDTO = new SpecieDTO();
        specieDTO.setId(123123l);
        specieDTO.setINaturalistId("12345");

        Page<SpecieDTO> page = new PageImpl<>(List.of(specieDTO), PageRequest.of(0, 1), 1);

        when(specieService.getAll(any(Pageable.class))).thenReturn(page).thenReturn(Page.empty());
        when(iNaturalistService.searchTaxonObservations(eq("12345"), anyInt(), anyInt()))
                .thenReturn(new TaxonObservationsResponse());

        // Mocking NominatimResponse
        NominatimResponse nominatimResponse = new NominatimResponse();
        Address address = new Address();
        address.setCountryCode("br");
        address.setISO3166_2_lvl4("BR-SP");
        nominatimResponse.setAddress(address);

        when(nominatimService.getReverseGeocode(anyDouble(), anyDouble())).thenReturn(nominatimResponse);

        // Act
        iNaturalistObservationJob.execute();

        // Assert
        verify(specieService, times(1)).getAll(any(Pageable.class));
        verify(iNaturalistService, times(1)).searchTaxonObservations(eq("12345"), anyInt(), anyInt());
    }

    @Test
    public void testExecute_noINaturalistId() {
        // Arrange
        SpecieDTO specieDTO = new SpecieDTO();
        specieDTO.setId(123123l);
        specieDTO.setINaturalistId(null);

        Page<SpecieDTO> page = new PageImpl<>(List.of(specieDTO), PageRequest.of(0, 1), 1);

        when(specieService.getAll(any(Pageable.class))).thenReturn(page).thenReturn(Page.empty());

        // Act
        iNaturalistObservationJob.execute();

        // Assert
        verify(specieService, times(1)).getAll(any(Pageable.class));
        verify(iNaturalistService, never()).searchTaxonObservations(anyString(), anyInt(), anyInt());
        verify(nominatimService, never()).getReverseGeocode(anyDouble(), anyDouble());
        verify(observationService, never()).createAsync(any(ObservationDTO.class));
    }
}