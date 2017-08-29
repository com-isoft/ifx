package com.isoft.ifx.core.filter;

/**
 * 组合的筛选器
 * Created by liuqiang03 on 2017/2/15.
 */
public class ComposedFilter extends AbstractFilter {
    /**
     * 连接器
     */
    private final Connector connector;

    /**
     * 左侧筛选器
     */
    private final Filter left;

    /**
     * 右侧筛选器
     */
    private final Filter right;

    public ComposedFilter(Filter left, Filter right, Connector connector) {
        if(left == null){
            throw new IllegalArgumentException("左侧筛选器不能为空!");
        }

        if(right == null){
            throw new IllegalArgumentException("右侧筛选器不能为空!");
        }

        if(connector == null){
            throw new IllegalArgumentException("连接器不能为空!");
        }
//        Assert.notNull(left,"左侧筛选器不能为空!");
//        Assert.notNull(right,"右侧筛选器不能为空!");
//        Assert.notNull(connector,"连接器不能为空!");

        this.connector = connector;
        this.left = left;
        this.right = right;
    }

    public Connector getConnector() {
        return connector;
    }

    public Filter getLeft() {
        return this.left;
    }

    public Filter getRight() {
        return this.right;
    }
}