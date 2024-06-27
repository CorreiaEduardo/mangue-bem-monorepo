package br.uneb.dcet.si20192.tees.manguebem.integration.inaturalist.service;

import br.uneb.dcet.si20192.tees.manguebem.integration.inaturalist.request.TaxonSearchRequestParameters;
import br.uneb.dcet.si20192.tees.manguebem.integration.inaturalist.response.TaxonObservationsResponse;
import br.uneb.dcet.si20192.tees.manguebem.integration.inaturalist.response.TaxonSearchResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class INaturalistService {

    private final RestTemplate restTemplate;

    @Autowired
    public INaturalistService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public TaxonSearchResponse searchTaxon(TaxonSearchRequestParameters parameters) {
        final String baseUrl = "https://api.inaturalist.org/v1/taxa";
        final String queryString = parameters.toString();
        final String url = baseUrl + "?" + queryString;

        final ResponseEntity<TaxonSearchResponse> responseEntity =
                restTemplate.exchange(url, HttpMethod.GET, null, TaxonSearchResponse.class);

        if (responseEntity.getStatusCode() == HttpStatus.OK) {
            return responseEntity.getBody();
        } else {
            // TODO: handle error response
            return null;
        }
    }

    public TaxonSearchResponse searchTaxonById(String id) {
        final String baseUrl = "https://api.inaturalist.org/v1/taxa/" + id;

        final ResponseEntity<TaxonSearchResponse> responseEntity =
                restTemplate.exchange(baseUrl, HttpMethod.GET, null, TaxonSearchResponse.class);

        if (responseEntity.getStatusCode() == HttpStatus.OK) {
            return responseEntity.getBody();
        } else {
            // TODO: handle error response
            return null;
        }
    }

    public TaxonObservationsResponse searchTaxonObservations(String taxonId, int pageNumber, int pageSize) {
        final String baseUrl = "https://api.inaturalist.org/v1/observations";
        final String url = UriComponentsBuilder
                .fromHttpUrl(baseUrl)
                .queryParam("nelat", "6.2922404729") // BR boudingbox
                .queryParam("nelng", "-32.9737378721") // BR boudingbox
                .queryParam("swlat", "-34.7332817902") // BR boudingbox
                .queryParam("swlng", "-75.1696725698") // BR boudingbox
                .queryParam("page", pageNumber)
                .queryParam("per_page", pageSize)
                .queryParam("taxon_id", taxonId)
                .toUriString();

        final ResponseEntity<TaxonObservationsResponse> responseEntity =
                restTemplate.exchange(url, HttpMethod.GET, null, TaxonObservationsResponse.class);

        if (responseEntity.getStatusCode() == HttpStatus.OK) {
            return responseEntity.getBody();
        } else {
            // TODO: handle error response
            return null;
        }
    }
}
