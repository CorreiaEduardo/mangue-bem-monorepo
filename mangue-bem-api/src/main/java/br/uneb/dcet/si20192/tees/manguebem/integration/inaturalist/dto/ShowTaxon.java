package br.uneb.dcet.si20192.tees.manguebem.integration.inaturalist.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class ShowTaxon {
    @JsonProperty("id")
    private Integer id;

    @JsonProperty("iconic_taxon_id")
    private Integer iconicTaxonId;

    @JsonProperty("iconic_taxon_name")
    private String iconicTaxonName;

    @JsonProperty("is_active")
    private Boolean isActive;

    @JsonProperty("name")
    private String name;

    @JsonProperty("preferred_common_name")
    private String preferredCommonName;

    @JsonProperty("rank")
    private String rank;

    @JsonProperty("rank_level")
    private Double rankLevel;

    @JsonProperty("ancestor_ids")
    private List<Integer> ancestorIds;

    @JsonProperty("colors")
    private List<Color> colors;

    @JsonProperty("conservation_status")
    private ConservationStatus conservationStatus;

    @JsonProperty("conservation_statuses")
    private List<TaxonConservationStatus> conservationStatuses;

    @JsonProperty("default_photo")
    private TaxonPhoto defaultPhoto;

    @JsonProperty("establishment_means")
    private EstablishmentMeans establishmentMeans;

    @JsonProperty("observations_count")
    private Integer observationsCount;

    @JsonProperty("preferred_establishment_means")
    private String preferredEstablishmentMeans;
}
