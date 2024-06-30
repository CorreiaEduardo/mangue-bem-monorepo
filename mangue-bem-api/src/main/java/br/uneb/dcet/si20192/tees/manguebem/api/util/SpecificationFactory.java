package br.uneb.dcet.si20192.tees.manguebem.api.util;

import br.uneb.dcet.si20192.tees.manguebem.api.dto.query.Filter;
import lombok.experimental.UtilityClass;
import org.springframework.data.jpa.domain.Specification;

import java.util.LinkedList;
import java.util.List;

import static org.springframework.data.jpa.domain.Specification.where;

@UtilityClass
public class SpecificationFactory {

    public static <T> Specification<T> of(List<Filter> allFilters) {
        if (allFilters.isEmpty()) return null;

        final List<Filter> filters = new LinkedList<>(allFilters);

        Specification<T> specification =
                where(createSpecification(filters.remove(0)));

        for (Filter filter : filters) {
            specification = specification.and(createSpecification(filter));
        }

        return specification;
    }

    private static <T> Specification<T> createSpecification(Filter filter) {
        switch (filter.getOperator()) {
            case EQUALS:
                return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get(filter.getField()),
                        castToRequiredType(root.get(filter.getField()).getJavaType(),
                                filter.getValue()));
            case LIKE:
                return (root, query, criteriaBuilder) ->
                        criteriaBuilder.like(root.get(filter.getField()),
                                "%" + filter.getValue() + "%");
            case NULL:
                return (root, query, criteriaBuilder) -> criteriaBuilder.isNull(root.get(filter.getField()));
            default:
                throw new RuntimeException("Operation not supported yet");
        }
    }

    private static Object castToRequiredType(Class fieldType, String value) {
        if (fieldType.isAssignableFrom(Double.class)) {
            return Double.valueOf(value);
        } else if (fieldType.isAssignableFrom(Integer.class)) {
            return Integer.valueOf(value);
        } else if (fieldType.isAssignableFrom(Boolean.class)) {
            return Boolean.valueOf(value);
        } else if (fieldType.isAssignableFrom(String.class)) {
            return value;
        } else if (Enum.class.isAssignableFrom(fieldType)) {
            return Enum.valueOf(fieldType, value);
        }
        return null;
    }
}
