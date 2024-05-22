package br.uneb.dcet.si20192.tees.manguebem.integration.iucnredlist.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class IUCNSpecieSearchResult {
    private int taxonid;
    private String scientific_name;
    private String kingdom;
    private String phylum;
    @JsonProperty("class")
    private String className;
    private String order;
    private String family;
    private String genus;
    private String main_common_name;
    private String authority;
    private int published_year;
    private String assessment_date;
    private String category;
    private String criteria;
    private String population_trend;
    private boolean marine_system;
    private boolean freshwater_system;
    private boolean terrestrial_system;
    private String assessor;
    private String reviewer;
    private Integer aoo_km2;
    private Integer eoo_km2;
    private int elevation_upper;
    private int elevation_lower;
    private Integer depth_upper;
    private Integer depth_lower;
    private Boolean errata_flag;
    private String errata_reason;
    private boolean amended_flag;
    private String amended_reason;
}
