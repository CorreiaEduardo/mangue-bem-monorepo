package br.uneb.dcet.si20192.tees.manguebem.api.entity.enums;

public enum FederativeUnit {
    UNKNOWN("Desconhecido", "NA"),
    DF("Distrito Federal", "DF"),
    AC("Acre", "AC"),
    AL("Alagoas", "AL"),
    AM("Amazonas", "AM"),
    AP("Amapá", "AP"),
    BA("Bahia", "BA"),
    CE("Ceará", "CE"),
    ES("Espírito Santo", "ES"),
    GO("Goiás", "GO"),
    MA("Maranhão", "MA"),
    MG("Minas Gerais", "MG"),
    MS("Mato Grosso do Sul", "MS"),
    MT("Mato Grosso", "MT"),
    PA("Pará", "PA"),
    PB("Paraíba", "PB"),
    PE("Pernambuco", "PE"),
    PI("Piauí", "PI"),
    PR("Paraná", "PR"),
    RJ("Rio de Janeiro", "RJ"),
    RN("Rio Grande do Norte", "RN"),
    RO("Rondônia", "RO"),
    RR("Roraima", "RR"),
    RS("Rio Grande do Sul", "RS"),
    SC("Santa Catarina", "SC"),
    SE("Sergipe", "SE"),
    SP("São Paulo", "SP"),
    TO("Tocantins", "TO");

    private final String name;
    private final String code;

    FederativeUnit(String name, String code) {
        this.name = name;
        this.code = code;
    }

    public static FederativeUnit fromCode(String code) {
        for (final FederativeUnit uf : FederativeUnit.values()) {
            if (uf.code.equalsIgnoreCase(code)) {
                return uf;
            }
        }

        return UNKNOWN;
    }

    public String getName() {
        return name;
    }

    public String getCode() {
        return code;
    }
}
