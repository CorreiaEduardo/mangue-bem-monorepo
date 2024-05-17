package br.uneb.dcet.si20192.tees.manguebem.api.util;

import br.uneb.dcet.si20192.tees.manguebem.api.dto.query.Filter;
import br.uneb.dcet.si20192.tees.manguebem.api.dto.query.QueryOperator;
import org.springframework.util.MultiValueMap;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class QueryParamParser {

    /**
     * @param src name=LK:XXX&field=EQ:YYYY
     */
    public static List<Filter> parseFilters(MultiValueMap<String, String> src, Class target) {
        final List<Filter> filters = new ArrayList<>();
        src.forEach((field, values) -> {
            if (ReflectionUtils.getFields(target).stream().anyMatch(it -> it.getName().equals(field))) {
                values.forEach(param -> {
                    final Filter filter = new Filter();
                    final QueryOperator operator = QueryOperator.of(param.split(":")[0]);
                    final String value = param.split(":")[1];

                    filter.setField(field);
                    filter.setOperator(operator);
                    filter.setValue(value);

                    filters.add(filter);
                });
            }
        });

        return Collections.unmodifiableList(filters);
    }
}
