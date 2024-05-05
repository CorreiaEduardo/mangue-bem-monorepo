package br.uneb.dcet.si20192.tees.manguebem.api.dto;

import br.uneb.dcet.si20192.tees.manguebem.api.entity.enums.FederativeUnit;
import br.uneb.dcet.si20192.tees.manguebem.api.entity.enums.ObservationType;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class ObservationDTO {
    @JsonIgnore
    private Long id;
    @JsonIgnore
    private Long specieId;
    private FederativeUnit brazilianFederativeUnit;
    private ObservationType type;
    private Long lat;
    private Long lng;
    private Long biomeId;
    private String literatureReference;
    private String iNaturalistId;
    private String speciesLinkId;
}
