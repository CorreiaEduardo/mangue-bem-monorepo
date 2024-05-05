package br.uneb.dcet.si20192.tees.manguebem.api.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public final class BiomeDTO {
    @JsonIgnore
    private Long id;
    private String name;
}
