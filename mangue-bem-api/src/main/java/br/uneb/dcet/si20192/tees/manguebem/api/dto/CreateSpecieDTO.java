package br.uneb.dcet.si20192.tees.manguebem.api.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotEmpty;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class CreateSpecieDTO {
    @JsonProperty("iNaturalistId")
    @NotEmpty
    private String iNaturalistId;

    @JsonProperty("paper")
    @NotEmpty
    private String DOI;
}
