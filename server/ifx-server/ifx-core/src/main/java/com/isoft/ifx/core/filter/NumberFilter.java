package com.isoft.ifx.core.filter;

import com.isoft.ifx.core.utils.EnumUtils;

/**
 * 数字删选器
 * Created by liuqiang03 on 2017/2/15.
 */
public class NumberFilter extends AbstractFilterItem {
    public NumberFilter(String property, Number value, NumberOperator operator) {
        super(property, value, EnumUtils.parseEnum(DataOperator.class, operator.getValue()), DataType.NUMBER);
    }
}
