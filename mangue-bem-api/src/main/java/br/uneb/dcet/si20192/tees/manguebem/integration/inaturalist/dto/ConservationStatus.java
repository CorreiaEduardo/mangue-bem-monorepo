package br.uneb.dcet.si20192.tees.manguebem.integration.inaturalist.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ConservationStatus {
    @JsonProperty("place_id")
    private Integer placeId;

    @JsonProperty("place")
    private CorePlace place;

    @JsonProperty("status")
    private String status;
}
