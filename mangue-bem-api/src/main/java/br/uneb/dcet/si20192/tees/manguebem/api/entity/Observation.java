package br.uneb.dcet.si20192.tees.manguebem.api.entity;

import br.uneb.dcet.si20192.tees.manguebem.api.entity.basic.CuratedEntity;
import br.uneb.dcet.si20192.tees.manguebem.api.entity.enums.FederativeUnit;
import br.uneb.dcet.si20192.tees.manguebem.api.entity.enums.ObservationType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "observations")
public class Observation extends CuratedEntity {

    @ManyToOne
    @JoinColumn(name = "specie_id")
    private Specie specie;

    @Column(name = "brazilian_federative_unit")
    @Enumerated(EnumType.STRING)
    private FederativeUnit brazilianFederativeUnit;

    @Column
    @Enumerated(EnumType.STRING)
    private ObservationType type;

    @Column
    private Long lat;

    @Column
    private Long lng;

    @ManyToOne
    @JoinColumn(name = "biome_id")
    private Biome biome;

    @Column(name = "literature_reference")
    private String literatureReference;

    @Column(name = "inaturalist_id")
    private String iNaturalistId;

    @Column(name = "specieslink_id")
    private String speciesLinkId;
}
