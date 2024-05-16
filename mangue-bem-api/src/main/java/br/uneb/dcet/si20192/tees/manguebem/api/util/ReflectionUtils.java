package br.uneb.dcet.si20192.tees.manguebem.api.util;

import lombok.experimental.UtilityClass;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@UtilityClass
public class ReflectionUtils {
    public static List<Field> getFields(Class<?> type) {
        return Collections.unmodifiableList(getAllFields(new ArrayList<>(), type));
    }

    private static List<Field> getAllFields(List<Field> fields, Class<?> type) {
        fields.addAll(Arrays.asList(type.getDeclaredFields()));

        if (type.getSuperclass() != null) {
            getAllFields(fields, type.getSuperclass());
        }

        return fields;
    }
}
