package com.isoft.ifx.service.dto;

import com.isoft.ifx.domain.dto.DTO;
import com.isoft.ifx.domain.model.AbstractEntity;

/**
 * 命令数据传输对象
 * Created by liuqiang03 on 2017/6/26.
 */
public interface CommandDTO<T extends AbstractEntity> extends DTO<T> {
    String getId();

    void setId(String id);

    long getVersion();

    void setVersion(long version);
}
