package br.uneb.dcet.si20192.tees.manguebem.api.job;

import br.uneb.dcet.si20192.tees.manguebem.api.dto.ObservationDTO;
import br.uneb.dcet.si20192.tees.manguebem.api.dto.SpecieDTO;
import br.uneb.dcet.si20192.tees.manguebem.api.entity.enums.ApprovalStatus;
import br.uneb.dcet.si20192.tees.manguebem.api.entity.enums.FederativeUnit;
import br.uneb.dcet.si20192.tees.manguebem.api.entity.enums.ObservationType;
import br.uneb.dcet.si20192.tees.manguebem.api.service.ObservationService;
import br.uneb.dcet.si20192.tees.manguebem.api.service.SpecieService;
import br.uneb.dcet.si20192.tees.manguebem.integration.specieslink.dto.Feature;
import br.uneb.dcet.si20192.tees.manguebem.integration.specieslink.response.SearchSpecieResponse;
import br.uneb.dcet.si20192.tees.manguebem.integration.specieslink.service.SpeciesLinkService;
import com.google.common.util.concurrent.RateLimiter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class SpeciesLinkObservationJob {

    private final RateLimiter rateLimiter = RateLimiter.create(1);
    private static final int SPECIESLINK_PAGE_LIMIT = 1000;

    private final ObservationService observationService;
    private final SpecieService specieService;
    private final SpeciesLinkService speciesLinkService;

    public SpeciesLinkObservationJob(ObservationService observationService, SpecieService specieService, SpeciesLinkService speciesLinkService) {
        this.observationService = observationService;
        this.specieService = specieService;
        this.speciesLinkService = speciesLinkService;
    }

    @Scheduled(cron="0 0 9 01 * ?")
    public void execute() {
        final int pageSize = 100;
        int pageNumber = 0;
        Pageable pageable = PageRequest.of(pageNumber, pageSize);

        Page<SpecieDTO> page;

        do {
            page = specieService.getAll(pageable);
            getSpeciesLinkObservations(page);

            pageable = page.hasNext() ? page.nextPageable() : Pageable.unpaged();
        } while (page.hasNext());
    }

    private void getSpeciesLinkObservations(Page<SpecieDTO> entityPage) {
        for (SpecieDTO entity : entityPage.getContent()) {
            if (entity.getINaturalistId() != null) {
                int offset = 0;
                int limit = SPECIESLINK_PAGE_LIMIT;
                boolean morePages = true;

                while (morePages) {
                    rateLimiter.acquire();
                    SearchSpecieResponse response = speciesLinkService.searchTaxonObservations(entity.getTaxonGenus(), entity.getTaxonName(), offset, limit);
                    if (response != null && response.getFeatures() != null) {

                        for (Feature observation : response.getFeatures()) {
                            Double lat = observation.getGeometry().getLat();
                            Double lng = observation.getGeometry().getLng();

                            ObservationDTO.ObservationDTOBuilder dtoBuilder = ObservationDTO
                                    .builder()
                                    .specieId(entity.getId())
                                    .type(ObservationType.SPECIES_LINK)
                                    .approvalStatus(ApprovalStatus.APPROVED)
                                    .brazilianFederativeUnit(FederativeUnit.fromName(observation.getProperties().getStateprovince()))
                                    .lat(lat)
                                    .lng(lng)
                                    .speciesLinkId(observation.getProperties().getBarcode());

                            observationService.createAsync(dtoBuilder.build());
                        }

                        morePages = response.getNumberReturned() > 0;
                        offset+=limit;
                    } else {
                        morePages = false;
                    }
                }
            }
        }
    }
}
