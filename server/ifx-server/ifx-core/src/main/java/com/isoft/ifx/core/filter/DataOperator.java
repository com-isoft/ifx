package com.isoft.ifx.core.filter;

import com.isoft.ifx.core.enumeration.BitEnum;

/**
 * 数据操作符
 * Created by liuqiang03 on 2017/2/9.
 */
public enum DataOperator implements BitEnum {
    EQ("等于", 1L),
    NEQ("不等于", 2L),
    GT("大于", 3L),
    GTE("大于等于", 4L),
    LT("小于", 5L),
    LTE("小于等于", 6L),
    CT("包含", 7L),
    SW("以...开头", 8L),
    EW("以...结尾", 9L),
    IN("属于", 10L),
    DES("子代", 11L),
    ANC("父代", 12L),
    BI("位值in", 13L),
    BC("位值contain", 14L);

    /**
     * 构造方法
     */
    DataOperator(String text, long value) {
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
