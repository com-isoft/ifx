package com.isoft.ifx.core.filter;

import com.isoft.ifx.core.enumeration.BitEnum;

/**
 * 布尔数据类型操作符
 * Created by liuqiang03 on 2017/2/15.
 */
public enum BooleanOperator implements BitEnum {
    EQ("等于", DataOperator.EQ.getValue()),
    NEQ("不等于", DataOperator.NEQ.getValue());

    private String text;
    private long value;

    BooleanOperator(String text, Long value) {
        this.text = text;
        this.value = value;
    }

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
