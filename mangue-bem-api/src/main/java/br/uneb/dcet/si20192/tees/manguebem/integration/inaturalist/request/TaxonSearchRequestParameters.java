package br.uneb.dcet.si20192.tees.manguebem.integration.inaturalist.request;

import lombok.*;

import java.util.List;
import java.util.StringJoiner;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TaxonSearchRequestParameters {
    // Name must begin with this value
    private String q;

    // Taxon is active
    private Boolean isActive;

    // Provide multiple values in new lines. Only show taxa with this ID, or its descendants
    private List<String> taxonId;

    // Taxon's parent must have this ID
    private Integer parentId;

    // Taxon must have this rank
    private List<String> rank;

    // Taxon must have this rank level. Some example values are 70 (kingdom), 60 (phylum), 50 (class), 40 (order), 30 (family), 20 (genus), 10 (species), 5 (subspecies)
    private Double rankLevel;

    // Must have an ID above this value
    private String idAbove;

    // Must have an ID below this value
    private String idBelow;

    // Number of results to return in a page. The maximum value is generally 200 unless otherwise noted
    private String perPage;

    // Locale preference for taxon common names
    private String locale;

    // Place preference for regional taxon common names
    private Integer preferredPlaceId;

    // Return only the record IDs
    private Boolean onlyId;

    // Include all taxon names in the response
    private Boolean allNames;

    // Sort order (default: desc)
    private String order;

    // Sort field (default: observations_count)
    private String orderBy;

    @Override
    public String toString() {
        StringJoiner joiner = new StringJoiner("&");

        if (this.q != null) {
            joiner.add("q=" + q);
        }

        if (this.isActive != null) {
            joiner.add("is_active=" + isActive);
        }

        if (this.taxonId != null && !taxonId.isEmpty()) {
            joiner.add("taxon_id=" + String.join("\n", taxonId));
        }

        if (this.parentId != null) {
            joiner.add("parent_id=" + parentId);
        }

        if (this.rank != null && !rank.isEmpty()) {
            joiner.add("rank=" + String.join("", rank));
        }

        if (this.rankLevel != null) {
            joiner.add("rank_level=" + rankLevel);
        }

        if (this.idAbove != null) {
            joiner.add("id_above=" + idAbove);
        }

        if (this.idBelow != null) {
            joiner.add("id_below=" + idBelow);
        }

        if (this.perPage != null) {
            joiner.add("per_page=" + perPage);
        }

        if (this.locale != null) {
            joiner.add("locale=" + locale);
        }

        if (this.preferredPlaceId != null) {
            joiner.add("preferred_place_id=" + preferredPlaceId);
        }

        if (this.onlyId != null) {
            joiner.add("only_id=" + onlyId);
        }

        if (this.allNames != null) {
            joiner.add("all_names=" + allNames);
        }

        if (this.order != null) {
            joiner.add("order=" + order);
        }

        if (this.orderBy != null) {
            joiner.add("order_by=" + orderBy);
        }

        return joiner.toString();
    }
}
