package br.uneb.dcet.si20192.tees.manguebem.api.entity;

import br.uneb.dcet.si20192.tees.manguebem.api.entity.basic.CuratedEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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

}
