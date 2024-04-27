package br.uneb.dcet.si20192.tees.manguebem.integration.inaturalist.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class EstablishmentMeans {
    @JsonProperty("establishment_means")
    private String establishmentMeans;

    @JsonProperty("place")
    private CorePlace place;
}
