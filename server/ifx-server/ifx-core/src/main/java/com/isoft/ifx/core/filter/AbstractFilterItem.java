package com.isoft.ifx.core.filter;

/**
 * 筛选项抽象基类
 * Created by liuqiang03 on 2017/2/15.
 */
public class AbstractFilterItem extends AbstractFilter implements FilterItem {
    /**
     * 数据操作符
     */
    private DataOperator operator;

    /**
     * 数据类型
     */
    private DataType dataType;

    /**
     * 属性名称
     */
    private String property;

    /**
     * 值
     */
    private Object value;

    AbstractFilterItem(String property, Object value, DataOperator operator, DataType dataType) {
        this.property = property;
        this.value = value;
        this.operator = operator;
        this.dataType = dataType;
    }

    /**
     * 获取数据操作符
     *
     * @return 数据操作符
     */
    @Override
    public DataOperator getOperator() {
        return operator;
    }

    /**
     * 获取数据类型
     *
     * @return 数据类型
     */
    @Override
    public DataType getType() {
        return dataType;
    }

    /**
     * 获取属性名称
     *
     * @return 属性名称
     */
    @Override
    public String getProperty() {
        return property;
    }

    /**
     * 获取值
     *
     * @return 值
     */
    @Override
    public Object getValue() {
        return value;
    }
}
