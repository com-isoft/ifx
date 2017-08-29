package com.isoft.ifx.core.filter;

/**
 * 筛选器抽象基类
 * Created by liuqiang03 on 2017/2/15.
 */
public abstract class AbstractFilter implements Filter {
    @Override
    public Filter and(Filter filter) {
        return new ComposedFilter(this, filter, Connector.AND);
    }

    /**
     * or 连接筛选器
     *
     * @param filter 筛选器
     * @return 筛选器
     */
    @Override
    public Filter or(Filter filter) {
        return new ComposedFilter(this, filter, Connector.OR);
    }
}
