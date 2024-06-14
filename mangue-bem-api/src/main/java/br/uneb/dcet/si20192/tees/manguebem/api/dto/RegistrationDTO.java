package br.uneb.dcet.si20192.tees.manguebem.api.dto;

public interface RegistrationDTO {
    String getName();

    String getEmail();

    String getPassword();

    br.uneb.dcet.si20192.tees.manguebem.api.entity.enums.UserRole getRole();

    void setName(String name);

    void setEmail(String email);

    void setPassword(String password);
}
