package br.uneb.dcet.si20192.tees.manguebem.integration.iucnredlist.service;

import br.uneb.dcet.si20192.tees.manguebem.integration.iucnredlist.dto.IUCNSpecieSearchResult;
import br.uneb.dcet.si20192.tees.manguebem.integration.iucnredlist.response.IUCNSpecieResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class IUCNRedlistService {
    private final RestTemplate restTemplate;
    private final String token;

    public IUCNRedlistService(RestTemplate restTemplate, @Value("${integration.iucnredlist.token}") String token) {
        this.restTemplate = restTemplate;
        this.token = token;
    }

    public IUCNSpecieSearchResult searchSpecie(String taxonGenus, String taxonName) {
        final String url = "https://apiv3.iucnredlist.org/api/v3/species/"
                + taxonGenus.toLowerCase() + " " + taxonName.toLowerCase()
                + "?token=" + token;

        final ResponseEntity<IUCNSpecieResponse> responseEntity =
                restTemplate.exchange(url, HttpMethod.GET, null, IUCNSpecieResponse.class);

        if (responseEntity.getStatusCode() == HttpStatus.OK) {
            if (responseEntity.getBody() != null && responseEntity.getBody().getResult() != null && !responseEntity.getBody().getResult().isEmpty()) {
                return responseEntity.getBody().getResult().get(0);
            }
            return null;
        } else {
            // TODO: handle error response
            return null;
        }
    }
}
