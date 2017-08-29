package com.isoft.ifx.core.filter;

import com.isoft.ifx.core.utils.EnumUtils;

/**
 * 字符串筛选器
 * Created by liuqiang03 on 2017/2/15.
 */
public class StringFilter extends AbstractFilterItem {
    public StringFilter(String property, String value, StringOperator operator) {
        super(property, value, EnumUtils.parseEnum(DataOperator.class, operator.getValue()), DataType.STRING);
    }
}