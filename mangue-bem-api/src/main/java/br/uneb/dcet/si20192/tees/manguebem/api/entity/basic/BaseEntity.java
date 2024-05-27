package br.uneb.dcet.si20192.tees.manguebem.api.entity.basic;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.lang.reflect.Field;
import java.time.LocalDateTime;

@Getter
@Setter
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public class BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", insertable = false, updatable = false, nullable = false)
    protected Long id;

    @CreatedDate
    @Column(name = "created_at", nullable = false)
    protected LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "updated_at", nullable = false)
    protected LocalDateTime updatedAt;

    @Column(name = "deleted_at")
    protected LocalDateTime deletedAt;

    @Column(name = "deleted_by")
    protected String deletedBy;

    public void merge(Object source) {
        for (Field field : this.getClass().getDeclaredFields()) {
            for (Field newField : source.getClass().getDeclaredFields()) {
                if (field.getName().equals(newField.getName())) {
                    try {
                        field.setAccessible(true);
                        newField.setAccessible(true);
                        field.set(this, newField.get(source) == null
                            ? field.get(this)
                            : newField.get(source)
                        );
                    } catch (IllegalAccessException ignore) {
                        // do nothing
                    }
                }
            }
        }
    }
}
