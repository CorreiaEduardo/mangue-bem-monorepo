package br.uneb.dcet.si20192.tees.manguebem.integration.openstreetmap.service;

import br.uneb.dcet.si20192.tees.manguebem.integration.openstreetmap.response.NominatimResponse;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class NominatimService {
    private final RestTemplate restTemplate;

    private static final String NOMINATIM_URL = "https://nominatim.openstreetmap.org/reverse";

    public NominatimService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public NominatimResponse getReverseGeocode(double lat, double lon) {
        String url = UriComponentsBuilder.fromHttpUrl(NOMINATIM_URL)
                .queryParam("lat", lat)
                .queryParam("lon", lon)
                .queryParam("zoom", 18)
                .queryParam("format", "jsonv2")
                .toUriString();

        return restTemplate.getForObject(url, NominatimResponse.class);
    }
}
