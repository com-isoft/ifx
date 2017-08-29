package com.isoft.ifx.core.filter;

import com.isoft.ifx.core.utils.EnumUtils;

/**
 * 布尔筛选器
 * Created by liuqiang03 on 2017/2/15.
 */
public class BooleanFilter extends AbstractFilterItem {
    public BooleanFilter(String property, Boolean value, BooleanOperator operator) {
        super(property, value, EnumUtils.parseEnum(DataOperator.class, operator.getValue()), DataType.BOOLEAN);
    }
}
