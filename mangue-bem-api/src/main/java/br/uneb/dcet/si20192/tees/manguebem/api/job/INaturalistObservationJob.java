package br.uneb.dcet.si20192.tees.manguebem.api.job;

import br.uneb.dcet.si20192.tees.manguebem.api.dto.ObservationDTO;
import br.uneb.dcet.si20192.tees.manguebem.api.dto.SpecieDTO;
import br.uneb.dcet.si20192.tees.manguebem.api.entity.enums.ApprovalStatus;
import br.uneb.dcet.si20192.tees.manguebem.api.entity.enums.FederativeUnit;
import br.uneb.dcet.si20192.tees.manguebem.api.entity.enums.ObservationType;
import br.uneb.dcet.si20192.tees.manguebem.api.service.ObservationService;
import br.uneb.dcet.si20192.tees.manguebem.api.service.SpecieService;
import br.uneb.dcet.si20192.tees.manguebem.integration.inaturalist.dto.Observation;
import br.uneb.dcet.si20192.tees.manguebem.integration.inaturalist.response.TaxonObservationsResponse;
import br.uneb.dcet.si20192.tees.manguebem.integration.inaturalist.service.INaturalistService;
import br.uneb.dcet.si20192.tees.manguebem.integration.openstreetmap.response.NominatimResponse;
import br.uneb.dcet.si20192.tees.manguebem.integration.openstreetmap.service.NominatimService;
import com.google.common.util.concurrent.RateLimiter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class INaturalistObservationJob {

    private final RateLimiter rateLimiter = RateLimiter.create(1);
    private static final int INATURALIST_PAGE_SIZE = 200;

    private final ObservationService observationService;
    private final SpecieService specieService;
    private final INaturalistService iNaturalistService;
    private final NominatimService nominatimService;

    public INaturalistObservationJob(ObservationService observationService, SpecieService specieService, INaturalistService iNaturalistService, NominatimService nominatimService) {
        this.observationService = observationService;
        this.specieService = specieService;
        this.iNaturalistService = iNaturalistService;
        this.nominatimService = nominatimService;
    }

    @Scheduled(cron="0 0 9 01 * ?")
    public void execute() {
        final int pageSize = 100;
        int pageNumber = 0;
        Pageable pageable = PageRequest.of(pageNumber, pageSize);

        Page<SpecieDTO> page;

        do {
            page = specieService.getAll(pageable);
            getINaturalistObservations(page);

            pageable = page.hasNext() ? page.nextPageable() : Pageable.unpaged();
        } while (page.hasNext());
    }

    private void getINaturalistObservations(Page<SpecieDTO> entityPage) {
        for (SpecieDTO entity : entityPage.getContent()) {
            if (entity.getINaturalistId() != null) {
                int page = 1;
                int perPage = INATURALIST_PAGE_SIZE;
                boolean morePages = true;

                while (morePages) {
                    rateLimiter.acquire();
                    TaxonObservationsResponse response = iNaturalistService.searchTaxonObservations(entity.getINaturalistId(), page, perPage);
                    if (response != null && response.getResults() != null) {

                        for (Observation observation : response.getResults()) {
                            Double lat = observation.getGeojson().getCoordinates().get(1);
                            Double lng = observation.getGeojson().getCoordinates().get(0);
                            NominatimResponse geocode = nominatimService.getReverseGeocode(lat, lng);

                            ObservationDTO.ObservationDTOBuilder dtoBuilder = ObservationDTO
                                    .builder()
                                    .specieId(entity.getId())
                                    .type(ObservationType.INATURALIST)
                                    .approvalStatus(ApprovalStatus.PENDING)
                                    .lat(lat)
                                    .lng(lng)
                                    .iNaturalistId(String.valueOf(observation.getId()));

                            if (geocode.getAddress() != null
                                    && geocode.getAddress().getCountryCode() != null
                                    && geocode.getAddress().getCountryCode().equals("br")
                                    && geocode.getAddress().getSubdivision() != null) {
                                dtoBuilder
                                        .brazilianFederativeUnit(FederativeUnit.fromCode(geocode.getAddress().getSubdivision()));
                            }
                            observationService.createAsync(dtoBuilder.build());
                        }

                        morePages = response.getResults().size() == perPage;
                        page++;
                    } else {
                        morePages = false;
                    }
                }
            }
        }
    }
}
