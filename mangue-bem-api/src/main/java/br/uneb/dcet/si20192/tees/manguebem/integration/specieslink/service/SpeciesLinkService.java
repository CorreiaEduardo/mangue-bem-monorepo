package br.uneb.dcet.si20192.tees.manguebem.integration.specieslink.service;

import br.uneb.dcet.si20192.tees.manguebem.integration.specieslink.response.SearchSpecieResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class SpeciesLinkService {

    private final RestTemplate restTemplate;
    private final String apiKey;

    @Autowired
    public SpeciesLinkService(RestTemplate restTemplate, @Value("${integration.specieslink.apikey}") String apikey) {
        this.restTemplate = restTemplate;
        this.apiKey = apikey;
    }

    public SearchSpecieResponse searchTaxonObservations(String taxonGenus, String taxonName, int offset, int limit) {
        final String baseUrl = "https://specieslink.net/ws/1.0/search";
        final String url = UriComponentsBuilder
                .fromHttpUrl(baseUrl)
                .queryParam("country", "Brazil")
                .queryParam("offset", offset)
                .queryParam("limit", limit)
                .queryParam("genus", taxonGenus)
                .queryParam("specificepithet", taxonName)
                .queryParam("apikey", apiKey)
                .toUriString();

        final ResponseEntity<SearchSpecieResponse> responseEntity =
                restTemplate.exchange(url, HttpMethod.GET, null, SearchSpecieResponse.class);

        if (responseEntity.getStatusCode() == HttpStatus.OK) {
            return responseEntity.getBody();
        } else {
            // TODO: handle error response
            return null;
        }
    }
}
