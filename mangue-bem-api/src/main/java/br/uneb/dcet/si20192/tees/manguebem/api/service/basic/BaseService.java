package br.uneb.dcet.si20192.tees.manguebem.api.service.basic;

import br.uneb.dcet.si20192.tees.manguebem.api.dto.basic.BaseDTO;
import br.uneb.dcet.si20192.tees.manguebem.api.dto.query.Filter;
import br.uneb.dcet.si20192.tees.manguebem.api.entity.User;
import br.uneb.dcet.si20192.tees.manguebem.api.entity.basic.BaseEntity;
import br.uneb.dcet.si20192.tees.manguebem.api.entity.basic.CuratedEntity;
import br.uneb.dcet.si20192.tees.manguebem.api.entity.enums.ApprovalStatus;
import br.uneb.dcet.si20192.tees.manguebem.api.exception.NotFoundException;
import br.uneb.dcet.si20192.tees.manguebem.api.util.QueryParamParser;
import br.uneb.dcet.si20192.tees.manguebem.api.util.SpecificationFactory;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.support.JpaRepositoryImplementation;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.MultiValueMap;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public abstract class BaseService<E extends BaseEntity, D extends BaseDTO> {

    public abstract Class<E> getEntityClass();

    public D create(D dto) {
        final E entity = getRepository().save(convert(dto));
        return convert(entity);
    }

    public D getById(Long id) {
        return getRepository().findById(id)
                .map(this::convert)
                .orElseThrow(NotFoundException::new);
    }

    public Page<D> getAll(Example<E> example, Pageable pageable) {
        return getRepository()
                .findAll(example, pageable)
                .map(this::convert);
    }

    public Page<D> getAll(MultiValueMap<String, String> parameters, Pageable pageable) {
        final Specification<E> specification = parseSpecification(parameters);

        return getRepository()
                .findAll(specification, pageable)
                .map(this::convert);
    }

    public Page<D> getAll(Pageable pageable) {
        return getRepository()
                .findAll(pageable)
                .map(this::convert);
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

    public D approve(Long id) {
        return updateApprovalStatus(id, ApprovalStatus.APPROVED);
    }

    public D reprove(Long id) {
        return updateApprovalStatus(id, ApprovalStatus.REJECTED);
    }

    private D updateApprovalStatus(Long id, ApprovalStatus approvalStatus) {
        final E entity = getRepository().findById(id)
                .orElseThrow(NotFoundException::new);
        final User principal = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (entity instanceof CuratedEntity) {
            ((CuratedEntity) entity).setApprovalStatus(approvalStatus);
            ((CuratedEntity) entity).setRevisedBy(principal);
            getRepository().save(entity);
        }

        return convert(entity);
    }

    public void delete(Long id) {
        E entity = getRepository().findById(id).orElseThrow(NotFoundException::new);
        final User principal = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        entity.setDeletedAt(LocalDateTime.now());
        entity.setDeletedBy(principal.getEmail());

        getRepository().save(entity);
    }

    protected Specification<E> parseSpecification(MultiValueMap<String, String> parameters) {
        final List<Filter> filters = QueryParamParser.parseFilters(parameters, getEntityClass());
        return SpecificationFactory.of(filters);
    }

    protected abstract JpaRepositoryImplementation<E, Long> getRepository();

    protected abstract D convert(E entity);

    protected abstract E convert(D dto);
}
