package br.uneb.dcet.si20192.tees.manguebem.integration.inaturalist.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class Observation {
    private Integer id;
    private Integer cachedVotesTotal;
    private Boolean captive;
    private Integer commentsCount;
    private String createdAt;
    private String createdTimeZone;
    private String description;
    private Integer favesCount;
    private PointGeoJson geojson;
    private String geoprivacy;
    private String taxonGeoprivacy;
    private Boolean idPlease;
    private Integer identificationsCount;
    private Boolean identificationsMostAgree;
    private Boolean identificationsMostDisagree;
    private Boolean identificationsSomeAgree;
    private String licenseCode;
    private String location;
    private Boolean mappable;
    private Integer numIdentificationAgreements;
    private Integer numIdentificationDisagreements;
    private Boolean obscured;
    private String observedOn;
    private String observedOnString;
    private String observedTimeZone;
    private Boolean outOfRange;
    private String placeGuess;
    private List<Integer> placeIds;
    private List<Integer> projectIds;
    private List<Integer> projectIdsWithCuratorId;
    private List<Integer> projectIdsWithoutCuratorId;
    private String qualityGrade;
    private List<Integer> reviewedBy;
    private Integer siteId;
    private String speciesGuess;
    private List<String> tags;
    private String timeObservedAt;
    private String timeZoneOffset;
    private String updatedAt;
    private String uri;
    private Boolean verifiable;
}
