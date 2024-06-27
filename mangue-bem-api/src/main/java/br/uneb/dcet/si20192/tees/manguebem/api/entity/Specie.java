package br.uneb.dcet.si20192.tees.manguebem.api.entity;

import br.uneb.dcet.si20192.tees.manguebem.api.entity.basic.CuratedEntity;
import br.uneb.dcet.si20192.tees.manguebem.api.entity.enums.MushroomGroup;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "species")
public class Specie extends CuratedEntity {

    @Column(name = "taxon_kingdom")
    private String taxonKingdom;

    @Column(name = "taxon_phylum")
    private String taxonPhylum;

    @Column(name = "taxon_class")
    private String taxonClass;

    @Column(name = "taxon_order")
    private String taxonOrder;

    @Column(name = "taxon_family")
    private String taxonFamily;

    @Column(name = "taxon_genus")
    private String taxonGenus;

    @Column(name = "taxon_name")
    private String taxonName;

    @Column(name = "bem_classification")
    private String bemClassification;

    @Column(name = "common_name")
    private String commonName;

    @Column
    private String description;

    @Column(name = "iucn")
    private String IUCN;

    @Column(name = "authors")
    private String authors;

    @Column(name = "brazilian_type")
    private String brazilianType;

    @Column(name = "brazilian_type_synonym")
    private String brazilianTypeSynonym;

    @Column(name = "inaturalist_id")
    private String iNaturalistId;

    @Column(name = "specieslink_id")
    private String speciesLinkId;

    @Column(name = "mushroom_group")
    private MushroomGroup mushroomGroup;

    @Column(name = "occurrence_season_start")
    private LocalDateTime occurrenceSeasonStart;

    @Column(name = "occurrence_season_end")
    private LocalDateTime occurrenceSeasonEnd;

    @Column(name = "flavor")
    private String flavor;

    @Column(name = "keywords")
    private String keywords;

    @JoinTable(name = "specie_similarities", joinColumns = {
            @JoinColumn(name = "specie_1", referencedColumnName = "id", nullable = false)}, inverseJoinColumns = {
            @JoinColumn(name = "specie_2", referencedColumnName = "id", nullable = false)})
    @ManyToMany
    private List<Specie> similaritiesList;

    @Column(name = "doi")
    private String doi;

    @OneToMany(mappedBy = "specie", fetch = FetchType.EAGER)
    private List<Observation> observations;
}
