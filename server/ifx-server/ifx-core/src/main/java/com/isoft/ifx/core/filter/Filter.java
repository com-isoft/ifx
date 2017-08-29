package com.isoft.ifx.core.filter;

/**
 * 筛选器接口
 * Created by liuqiang03 on 2017/2/14.
 */
public interface Filter {
    /**
     * and 连接筛选器
     *
     * @param filter 筛选器
     * @return 筛选器
     */
    Filter and(Filter filter);

    /**
     * or 连接筛选器
     *
     * @param filter 筛选器
     * @return 筛选器
     */
    Filter or(Filter filter);
}
