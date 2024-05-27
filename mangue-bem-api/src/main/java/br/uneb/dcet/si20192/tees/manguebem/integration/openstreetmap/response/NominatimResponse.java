package br.uneb.dcet.si20192.tees.manguebem.integration.openstreetmap.response;

import br.uneb.dcet.si20192.tees.manguebem.integration.openstreetmap.dto.Address;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class NominatimResponse {
    @JsonProperty("place_id")
    private Integer placeId;
    private String licence;
    @JsonProperty("osm_type")
    private String osmType;
    @JsonProperty("osm_id")
    private Long osmId;
    private String lat;
    private String lon;
    private String category;
    private String type;
    @JsonProperty("place_rank")
    private Integer placeRank;
    private Double importance;
    private String addresstype;
    private String name;
    @JsonProperty("display_name")
    private String displayName;
    private Address address;
    private List<String> boundingbox;
}
