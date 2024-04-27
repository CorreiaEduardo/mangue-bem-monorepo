package br.uneb.dcet.si20192.tees.manguebemapi.entity;

import br.uneb.dcet.si20192.tees.manguebemapi.entity.basic.BaseEntity;
import br.uneb.dcet.si20192.tees.manguebemapi.entity.enums.UserRole;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users")
public class User extends BaseEntity {
    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String email;

    @Column(name = "encrypted_password", nullable = false)
    private String encryptedPassword;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UserRole role;
}
