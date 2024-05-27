package br.uneb.dcet.si20192.tees.manguebem.integration.openstreetmap.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class Address {
    private String railway;
    private String road;
    private String suburb;
    private String city;
    private String municipality;
    private String county;
    private String stateDistrict;
    private String state;
    private String ISO3166_2_lvl4;
    private String region;
    private String postcode;
    private String country;
    private String countryCode;

    public String getSubdivision() {
        if (this.ISO3166_2_lvl4 == null) return null;

        int hyphenIndex = this.ISO3166_2_lvl4.lastIndexOf('-');
        if (hyphenIndex != -1) {
            return this.ISO3166_2_lvl4.substring(hyphenIndex + 1);
        }

        return null;
    }
}
