package br.uneb.dcet.si20192.tees.manguebem.api.dto.basic;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class Pagination {
    private long totalElements;
    private int totalPages;
    private int pageNumber;
    private int pageSize;
    private boolean hasNext;
}