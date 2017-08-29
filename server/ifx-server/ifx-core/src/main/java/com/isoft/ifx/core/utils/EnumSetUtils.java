package com.isoft.ifx.core.utils;

import com.isoft.ifx.core.enumeration.BitEnum;

import java.util.EnumSet;
import java.util.HashSet;
import java.util.Set;

/**
 * 枚举集合帮助类
 * Created by liuqiang03 on 2017/6/22.
 */
public final class EnumSetUtils {
    /**
     * 枚举集合的值
     *
     * @param set
     * @return
     */
    public static <T extends Enum<T> & BitEnum> long valueOf(EnumSet<T> set) {
        long result = 0;

        for (BitEnum item : set) {
            result = result | item.getValue();
        }

        return result;
    }

    /**
     * 根据值获取枚举集合
     *
     * @param value 值
     * @param clazz 枚举类型
     * @return 枚举集合
     */
    public static <T extends Enum<T> & BitEnum> EnumSet<T> setOf(long value, Class<T> clazz) {
        EnumSet<T> set = EnumSet.noneOf(clazz);

        for (long i = 1; i <= value; i = 2 * i) {
            if (i == (i & value)) {
                for (Object obj : clazz.getEnumConstants()) {
                    if (obj instanceof BitEnum) {
                        if (i == ((BitEnum) obj).getValue()) {
                            set.add((T) obj);
                        }
                    }
                }
            }
        }

        return set;
    }

    public static <T extends Enum<T> & BitEnum> Set<String> namesOf(EnumSet<T> set) {
        Set<String> result = new HashSet<>();

        for (T item : set) {
            result.add(item.getName().toLowerCase());
        }

        return result;
    }
}
