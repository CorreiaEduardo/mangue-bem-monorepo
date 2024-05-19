package br.uneb.dcet.si20192.tees.manguebem.api.util;

import lombok.experimental.UtilityClass;
import org.springframework.util.MultiValueMap;

import java.lang.reflect.Field;
import java.util.*;

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

    public static <T> T createObjectFromMap(Class<T> clazz, MultiValueMap<String, String> params) {
        T instance;
        try {
            instance = clazz.getDeclaredConstructor().newInstance();
            setAllFieldsToNull(instance);
            for (Map.Entry<String, List<String>> entry : params.entrySet()) {
                String key = entry.getKey();
                String value = entry.getValue().get(0);
                if (!value.contains(":")) {
                    continue;
                }
                String actualValue = value.substring(3);

                setFieldValue(instance, key, actualValue);
            }
        } catch (Exception e) {
            throw new RuntimeException("Failed to create instance of class: " + clazz.getName(), e);
        }
        return instance;
    }

    private static void setFieldValue(Object obj, String key, String value) throws Exception {
        String[] parts = key.split("\\.");
        if (parts.length == 2) {
            String fieldName = parts[0];
            String nestedFieldName = parts[1];

            Field field = obj.getClass().getDeclaredField(fieldName);
            field.setAccessible(true);

            Object nestedObject = field.get(obj);
            if (nestedObject == null) {
                nestedObject = field.getType().getDeclaredConstructor().newInstance();
                setAllFieldsToNull(nestedObject);
                field.set(obj, nestedObject);
            }

            setNestedFieldValue(nestedObject, nestedFieldName, value);
        } else {
            setSimpleFieldValue(obj, key, value);
        }
    }

    private static void setNestedFieldValue(Object obj, String fieldName, String value) throws Exception {
        Field field = obj.getClass().getDeclaredField(fieldName);
        field.setAccessible(true);
        field.set(obj, convertValue(field.getType(), value));
    }

    private static void setSimpleFieldValue(Object obj, String fieldName, String value) throws Exception {
        Field field = obj.getClass().getDeclaredField(fieldName);
        field.setAccessible(true);
        field.set(obj, convertValue(field.getType(), value));
    }

    public static void setAllFieldsToNull(Object obj) {
        if (obj == null) {
            return;
        }

        Class<?> clazz = obj.getClass();
        setFieldsToNull(obj, clazz);
        Class<?> superClass = clazz.getSuperclass();
        while (superClass != null) {
            setFieldsToNull(obj, superClass);
            superClass = superClass.getSuperclass();
        }
    }

    private static void setFieldsToNull(Object obj, Class<?> clazz) {
        Field[] fields = clazz.getDeclaredFields();

        for (Field field : fields) {
            try {
                field.setAccessible(true);
                if (!field.getType().isPrimitive()) {
                    field.set(obj, null);
                }
            } catch (IllegalAccessException e) {
                throw new RuntimeException("Failed to set field to null: " + field.getName(), e);
            }
        }
    }

    private static Object convertValue(Class<?> type, String value) {
        if (type == String.class) {
            return value;
        } else if (type == Long.class || type == long.class) {
            return Long.parseLong(value);
        } else if (type.isEnum()) {
            return Enum.valueOf((Class<Enum>) type, value);
        }
        return value;
    }
}
