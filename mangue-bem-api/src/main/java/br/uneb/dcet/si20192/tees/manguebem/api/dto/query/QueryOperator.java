package br.uneb.dcet.si20192.tees.manguebem.api.dto.query;

import java.util.Arrays;

public enum QueryOperator {
    EQUALS("EQ"),
    LIKE("LK");

    private final String alias;

    QueryOperator(String alias) {
        this.alias = alias;
    }

    public static QueryOperator of(String alias) {
        return Arrays.stream(QueryOperator.values())
                .filter(it -> it.alias.equals(alias.toUpperCase()))
                .findFirst()
                .orElseThrow(RuntimeException::new);
    }
}
