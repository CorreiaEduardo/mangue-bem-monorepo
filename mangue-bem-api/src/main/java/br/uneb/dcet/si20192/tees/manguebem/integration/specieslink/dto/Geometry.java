package br.uneb.dcet.si20192.tees.manguebem.integration.specieslink.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class Geometry {
    private String type;
    private List<Double> coordinates;

    public Double getLat() {
        if (this.coordinates == null) return null;
        return coordinates.get(1);
    }

    public Double getLng() {
        if (this.coordinates == null) return null;
        return coordinates.get(0);
    }
}
