package com.isoft.ifx.domain.repository;

import com.isoft.ifx.core.enumeration.BitEnum;
import com.isoft.ifx.core.enumeration.BitEnumItem;
import com.isoft.ifx.core.enumeration.EnumDescriptor;
import com.isoft.ifx.core.utils.EnumUtils;
import org.reflections.Reflections;

import java.lang.annotation.Annotation;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 * 默认枚举仓储实现
 */
public class DefaultBitEnumRepository implements BitEnumRepository {
    private static Map<String, List<BitEnumItem>> enums;

    public DefaultBitEnumRepository(String... basePackages) {
        DefaultBitEnumRepository.enums = new HashMap<>();

        Reflections reflections = new Reflections(basePackages);
        Set<Class<? extends BitEnum>> classes = reflections.getSubTypesOf(BitEnum.class);

        for (Class clazz : classes) {
            Annotation descriptor = clazz.getAnnotation(EnumDescriptor.class);
            if (descriptor != null) {
                enums.put(((EnumDescriptor) descriptor).name(), EnumUtils.getEnumItemList(clazz));
            }
        }
    }

    @Override
    public List<BitEnumItem> get(String name) {
        return enums.get(name);
    }

    public static Map<String, List<BitEnumItem>> getEnums() {
        return enums;
    }
}
