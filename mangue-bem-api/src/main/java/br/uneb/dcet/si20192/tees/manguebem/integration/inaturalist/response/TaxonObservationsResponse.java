package br.uneb.dcet.si20192.tees.manguebem.integration.inaturalist.response;

import br.uneb.dcet.si20192.tees.manguebem.integration.inaturalist.dto.Observation;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class TaxonObservationsResponse {
    @JsonProperty("total_results")
    private Integer totalResults;

    @JsonProperty("page")
    private Integer page;

    @JsonProperty("per_page")
    private Integer perPage;

    @JsonProperty("results")
    private List<Observation> results;
}
