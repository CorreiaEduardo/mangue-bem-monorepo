package br.uneb.dcet.si20192.tees.manguebem.api.dto;

import lombok.*;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class UFReportDTO {
    private List<UFReportItemDTO> items;
}
