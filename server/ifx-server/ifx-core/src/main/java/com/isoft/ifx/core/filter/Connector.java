package com.isoft.ifx.core.filter;

import com.isoft.ifx.core.enumeration.BitEnum;

/**
 * 连接器
 * Created by liuqiang03 on 2017/2/9.
 */
public enum Connector implements BitEnum {
    AND("与", 1L),
    OR("或", 2L);

    /**
     * 构造方法
     */
    Connector(String text, Long value) {
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
