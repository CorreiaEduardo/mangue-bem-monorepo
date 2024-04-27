package br.uneb.dcet.si20192.tees.manguebem.integration.inaturalist.service;

import br.uneb.dcet.si20192.tees.manguebem.integration.inaturalist.request.TaxonSearchRequestParameters;
import br.uneb.dcet.si20192.tees.manguebem.integration.inaturalist.response.TaxonSearchResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

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
}
