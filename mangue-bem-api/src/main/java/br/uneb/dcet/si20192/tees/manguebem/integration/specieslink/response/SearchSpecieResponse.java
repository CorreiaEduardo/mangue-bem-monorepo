package br.uneb.dcet.si20192.tees.manguebem.integration.specieslink.response;

import br.uneb.dcet.si20192.tees.manguebem.integration.specieslink.dto.Feature;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class SearchSpecieResponse {
    private String type;
    private List<Feature> features;
    private int numberReturned;
}
