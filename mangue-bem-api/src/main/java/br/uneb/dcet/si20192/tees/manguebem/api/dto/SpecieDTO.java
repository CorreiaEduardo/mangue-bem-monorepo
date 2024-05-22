package br.uneb.dcet.si20192.tees.manguebem.api.dto;

import br.uneb.dcet.si20192.tees.manguebem.api.dto.basic.BaseDTO;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public final class SpecieDTO extends BaseDTO {
    private Long id;
    private String taxonKingdom;
    private String taxonPhylum;
    private String taxonClass;
    private String taxonOrder;
    private String taxonFamily;
    private String taxonGenus;
    private String taxonName;
    private String commonName;
    private String bemClassification;
    private String description;
    private String IUCN;
    private String authors;
    private String brazilianType;
    private String brazilianTypeSynonym;
    private String iNaturalistId;
    private String speciesLinkId;
}
