package br.uneb.dcet.si20192.tees.manguebem.api.util;

import br.uneb.dcet.si20192.tees.manguebem.api.dto.basic.Page;
import br.uneb.dcet.si20192.tees.manguebem.api.dto.basic.Pagination;

import java.util.List;

public final class PageMapper {
    private PageMapper() {

    }

    public static <T> Page<T> of(org.springframework.data.domain.Page<T> domainPage) {
        return (Page<T>) Page.builder()
                .content((List<Object>) domainPage.getContent())
                .pagination(
                        Pagination.builder()
                                .totalElements(domainPage.getTotalElements())
                                .totalPages(domainPage.getTotalPages())
                                .pageSize(domainPage.getSize())
                                .pageNumber(domainPage.getNumber())
                                .hasNext(!domainPage.isLast())
                                .build()
                )
                .build();
    }
}
