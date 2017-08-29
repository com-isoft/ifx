package com.isoft.ifx.core.filter;

import com.isoft.ifx.core.enumeration.BitEnum;

/**
 * 字符串操作符
 * Created by liuqiang03 on 2017/2/9.
 */
public enum StringOperator implements BitEnum {
    EQ("等于", DataOperator.EQ.getValue()),
    NEQ("不等于", DataOperator.NEQ.getValue()),
    CT("包含", DataOperator.CT.getValue()),
    SW("以...开头", DataOperator.SW.getValue()),
    EW("以...结尾", DataOperator.EW.getValue());

    /**
     * 构造方法
     */
    StringOperator(String text, long value) {
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
