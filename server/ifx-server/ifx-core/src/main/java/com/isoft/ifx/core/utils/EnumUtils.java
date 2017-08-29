package com.isoft.ifx.core.utils;

import com.isoft.ifx.core.enumeration.BitEnum;
import com.isoft.ifx.core.enumeration.BitEnumItem;

import java.util.ArrayList;
import java.util.EnumMap;
import java.util.EnumSet;
import java.util.List;

/**
 * Created by liuqiang03 on 2017/6/22.
 */
public final class EnumUtils {
    public static <E extends Enum<E> & BitEnum> long and(E one, E two, E... bitEnums) {
        return caculate((p1, p2) -> p1 & p2, one, two, bitEnums);
    }

    public static <E extends Enum<E> & BitEnum> long or(E one, E two, E... bitEnums) {
        return caculate((p1, p2) -> p1 | p2, one, two, bitEnums);
    }

    public static <E extends Enum<E> & BitEnum> EnumMap<E, String> getEnumMap(Class<E> type) {
        EnumMap<E, String> map = new EnumMap<>(type);
        for (E val : EnumSet.allOf(type)) {
            map.put(val, val.getText());
        }

        return map;
    }

    public static <E extends Enum<E> & BitEnum> List<BitEnumItem> getEnumItemList(Class<E> type) {
        List<BitEnumItem> results = new ArrayList<>();

        for (E val : type.getEnumConstants()) {
            BitEnumItem item = new BitEnumItem();
            item.setName(val.getName());
            item.setText(val.getText());
            item.setValue(val.getValue());
            results.add(item);
        }

        return results;
    }

    /**
     * 根据值查找枚举
     *
     * @param type  枚举类型
     * @param value 值
     * @param <E>   枚举
     * @return 枚举
     */
    @SuppressWarnings("unchecked")
    public static <E extends Enum> E parseEnum(Class type, long value) {
        for (Object val : EnumSet.allOf(type)) {
            if (BitEnum.class.isAssignableFrom(type)) {
                if (((BitEnum) val).getValue() == value) {
                    return (E) val;
                }
            } else {
                if (((E) val).ordinal() == value) {
                    return (E) val;
                }
            }
        }
        throw new IllegalArgumentException(
                "指定的枚举类型 " + type.getCanonicalName() + " 不包含值：" + value);
    }

    private static <E extends Enum<E> & BitEnum> long caculate(BitCaculator caculator, E one, E two, E... bitEnums) {
        long result = caculator.caculate(one.getValue(), two.getValue());

        for (E bitEnum : bitEnums) {
            result = caculator.caculate(result, bitEnum.getValue());
        }

        return result;
    }

    interface BitCaculator {
        long caculate(long one, long two);
    }

}
