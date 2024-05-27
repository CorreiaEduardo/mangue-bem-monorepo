package br.uneb.dcet.si20192.tees.manguebem.api.dto;

import br.uneb.dcet.si20192.tees.manguebem.api.entity.enums.FederativeUnit;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class UFReportItemDTO {
    private FederativeUnit uf;
    private Long speciesCount;
}
