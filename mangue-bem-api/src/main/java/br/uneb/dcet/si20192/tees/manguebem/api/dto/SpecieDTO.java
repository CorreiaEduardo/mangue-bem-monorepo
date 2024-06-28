package br.uneb.dcet.si20192.tees.manguebem.api.dto;

import br.uneb.dcet.si20192.tees.manguebem.api.dto.basic.BaseDTO;
import br.uneb.dcet.si20192.tees.manguebem.api.entity.enums.MushroomGroup;
import jakarta.persistence.Column;
import lombok.*;

import java.time.LocalDateTime;

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
    private String doi;
    private MushroomGroup mushroomGroup;
    private LocalDateTime occurrenceSeasonStart;
    private LocalDateTime occurrenceSeasonEnd;
    private String flavor;
    private String keywords;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String reviserEmail;
}
