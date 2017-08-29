package com.isoft.ifx.domain.model;

/**
 * 逻辑删除接口
 */
public interface LogicalRemovable {
    /**
     *
     * @return
     */
    boolean isDeleted();

    /**
     *
     * @param deleted
     */
    void setDeleted(boolean deleted);
}
