package br.uneb.dcet.si20192.tees.manguebem.integration.inaturalist.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class PointGeoJson {
    private String type;
    private List<Double> coordinates;
}
