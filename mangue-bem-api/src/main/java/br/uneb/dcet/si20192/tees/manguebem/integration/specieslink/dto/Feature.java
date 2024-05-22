package br.uneb.dcet.si20192.tees.manguebem.integration.specieslink.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
public class Feature {
    private String type;
    private Geometry geometry;
    private SpecieProperties properties;
}
