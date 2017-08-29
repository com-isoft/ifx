package com.isoft.ifx.core.filter;

import com.isoft.ifx.core.utils.EnumUtils;

import java.util.Date;

/**
 * 日期筛选器
 * Created by liuqiang03 on 2017/2/15.
 */
public class DateFilter extends AbstractFilterItem {
    public DateFilter(String property, Date value, DateOperator operator) {
        super(property, value, EnumUtils.parseEnum(DataOperator.class, operator.getValue()), DataType.DATE);
    }
}