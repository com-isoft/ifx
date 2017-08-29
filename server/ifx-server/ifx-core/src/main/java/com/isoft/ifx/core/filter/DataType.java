package com.isoft.ifx.core.filter;

import com.isoft.ifx.core.enumeration.BitEnum;

/**
 * 数据类型
 * Created by liuqiang03 on 2017/2/9.
 */
public enum DataType implements BitEnum {
    STRING("字符串", 1L),
    BOOLEAN("布尔", 2L),
    NUMBER("数字", 4L),
    DATE("日期", 8L);

    /**
     * 构造方法
     */
    DataType(String text, long value) {
        this.text = text;
        this.value = value;
    }

    /**
     * 名称
     */
    private String text;

    /**
     * 值
     */
    private long value;

    /**
     * 获取枚举值
     *
     * @return 枚举值
     */
    @Override
    public long getValue() {
        return value;
    }

    /**
     * 获取枚举文本
     *
     * @return 枚举文本
     */
    @Override
    public String getText() {
        return text;
    }

    /**
     * 获取枚举名称
     *
     * @return 枚举名称
     */
    @Override
    public String getName() {
        return this.name();
    }
}
