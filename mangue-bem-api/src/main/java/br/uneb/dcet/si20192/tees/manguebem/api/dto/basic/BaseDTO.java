package br.uneb.dcet.si20192.tees.manguebem.api.dto.basic;

import java.lang.reflect.Field;

public abstract class BaseDTO {
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

    public abstract Long getId();
}
