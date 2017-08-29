package com.isoft.ifx.core.enumeration;

/**
 * 位值枚举接口
 * Created by liuqiang03 on 2017/6/16.
 */
public interface BitEnum {
    /**
     * 获取枚举值
     *
     * @return 枚举值
     */
    long getValue();

    /**
     * 获取枚举文本
     *
     * @return 枚举文本
     */
    String getText();

    /**
     * 获取枚举名称
     *
     * @return 枚举名称
     */
    String getName();
}
