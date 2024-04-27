package br.uneb.dcet.si20192.tees.manguebem.integration.inaturalist.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class TaxonConservationStatus {
    @JsonProperty("source_id")
    private Integer sourceId;

    @JsonProperty("authority")
    private String authority;

    @JsonProperty("status")
    private String status;

    @JsonProperty("status_name")
    private String statusName;

    @JsonProperty("iucn")
    private Integer iucn;

    @JsonProperty("geoprivacy")
    private String geoprivacy;

    @JsonProperty("place")
    private CorePlace place;
}
