package com.isoft.ifx.core.filter;

import java.util.Date;

/**
 * 删选器工厂
 * Created by liuqiang03 on 2017/2/15.
 */
public class Filters {
    public static Filter stringFilter(String property, String value, StringOperator operator) {
        return new StringFilter(property, value, operator);
    }

    public static Filter booleanFilter(String property, Boolean value, BooleanOperator operator) {
        return new BooleanFilter(property, value, operator);
    }

    public static Filter numberFilter(String property, Number value, NumberOperator operator) {
        return new NumberFilter(property, value, operator);
    }

    public static Filter dateFilter(String property, Date value, DateOperator operator) {
        return new DateFilter(property, value, operator);
    }
}
