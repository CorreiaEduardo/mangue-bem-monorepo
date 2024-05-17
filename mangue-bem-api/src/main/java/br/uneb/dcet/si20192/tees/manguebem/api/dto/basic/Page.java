package br.uneb.dcet.si20192.tees.manguebem.api.dto.basic;

import lombok.*;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class Page<T> {
    private List<T> content;
    private Pagination pagination;
}
