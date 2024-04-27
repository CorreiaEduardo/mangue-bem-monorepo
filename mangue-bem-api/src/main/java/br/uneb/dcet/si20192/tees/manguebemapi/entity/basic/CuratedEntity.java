package br.uneb.dcet.si20192.tees.manguebemapi.entity.basic;

import br.uneb.dcet.si20192.tees.manguebemapi.entity.User;
import br.uneb.dcet.si20192.tees.manguebemapi.entity.enums.ApprovalStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@MappedSuperclass
public class CuratedEntity extends BaseEntity {
    public CuratedEntity() {
        this.approvalStatus = ApprovalStatus.PENDING;
    }

    @Enumerated(EnumType.STRING)
    @Column(name = "approval_status", nullable = false)
    protected ApprovalStatus approvalStatus;

    @ManyToOne
    @JoinColumn(name = "revised_by")
    protected User revisedBy;
}
