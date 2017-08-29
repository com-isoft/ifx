package com.isoft.ifx.domain.model;

import java.util.Date;

/**
 * 审计接口
 * Created by liuqiang03 on 2017/6/23.
 */
public interface Auditable {
    /**
     * 获取创建人标识
     *
     * @return 创建人标识
     */
    String getCreatedById();

    /**
     * 获取创建时间
     *
     * @return 创建时间
     */
    Date getCreatedDate();

    /**
     * 获取最后一次修改人标识
     *
     * @return 最后一次修改人标识
     */
    String getLastModifiedById();

    /**
     * 获取最后一次修改时间
     *
     * @return 最后一次修改时间
     */
     Date getLastModifiedDate();
}
