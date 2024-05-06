package br.uneb.dcet.si20192.tees.manguebem.api.service.basic;

import br.uneb.dcet.si20192.tees.manguebem.api.dto.basic.BaseDTO;
import br.uneb.dcet.si20192.tees.manguebem.api.entity.basic.BaseEntity;
import br.uneb.dcet.si20192.tees.manguebem.api.exception.NotFoundException;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.context.SecurityContextHolder;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public abstract class BaseService<E extends BaseEntity, D extends BaseDTO> {

    public D create(D dto) {
        final E entity = getRepository().save(convert(dto));
        return convert(entity);
    }

    public D getById(Long id) {
        return getRepository().findById(id)
                .map(this::convert)
                .orElseThrow(NotFoundException::new);
    }

    public List<D> getAll() {
        return getRepository().findAll()
                .stream()
                .map(this::convert)
                .toList();
    }

    public D update(D dto) {
        Optional<E> target = getRepository().findById(dto.getId());
        if (target.isPresent()) {
            E savedEntity = target.get();
            savedEntity.merge(dto);

            final E newEntity = getRepository().save(savedEntity);
            return convert(newEntity);
        } else {
            throw new NotFoundException();
        }
    }

    public void delete(Long id) {
        E entity = getRepository().findById(id).orElseThrow(NotFoundException::new);
        final String username = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();

        entity.setDeletedAt(LocalDateTime.now());
        entity.setDeletedBy(username);

        getRepository().save(entity);
    }

    protected abstract JpaRepository<E, Long> getRepository();

    protected abstract D convert(E entity);

    protected abstract E convert(D dto);
}