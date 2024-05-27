package br.uneb.dcet.si20192.tees.manguebem.integration.inaturalist.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class TaxonPhoto {
    @JsonProperty("id")
    private Integer id;

    @JsonProperty("attribution")
    private String attribution;

    @JsonProperty("license_code")
    private String licenseCode;

    @JsonProperty("url")
    private String url;

    @JsonProperty("medium_url")
    private String mediumUrl;

    @JsonProperty("square_url")
    private String squareUrl;
}
