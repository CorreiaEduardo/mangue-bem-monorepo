package br.uneb.dcet.si20192.tees.manguebem.api.controller.dto;

import br.uneb.dcet.si20192.tees.manguebem.api.entity.enums.UserRole;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@AllArgsConstructor
public final class UserRegistrationDTO {

    @Setter
    private String name;

    @Setter
    private String email;

    @Setter
    private String password;

    @JsonIgnore
    private UserRole role;

    public UserRegistrationDTO() {
        this.role = UserRole.VISITOR;
    }
}