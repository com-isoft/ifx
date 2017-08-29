package com.isoft.ifx.core.filter;

/**
 * 筛选项接口
 * Created by liuqiang03 on 2017/2/15.
 */
public interface FilterItem extends Filter {
    /**
     * 获取数据操作符
     *
     * @return 数据操作符
     */
    DataOperator getOperator();

    /**
     * 获取数据类型
     *
     * @return 数据类型
     */
    DataType getType();

    /**
     * 获取属性名称
     *
     * @return 属性名称
     */
    String getProperty();

    /**
     * 获取值
     *
     * @return 值
     */
    Object getValue();
}
