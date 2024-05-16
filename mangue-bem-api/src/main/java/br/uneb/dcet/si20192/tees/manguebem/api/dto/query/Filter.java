package br.uneb.dcet.si20192.tees.manguebem.api.dto.query;

import lombok.Data;

import java.util.List;

@Data
public class Filter {
    private String field;
    private QueryOperator operator;
    private String value;
}
