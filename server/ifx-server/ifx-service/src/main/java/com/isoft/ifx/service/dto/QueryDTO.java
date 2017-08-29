package com.isoft.ifx.service.dto;

import com.isoft.ifx.domain.dto.DTO;
import com.isoft.ifx.domain.model.AbstractEntity;

/**
 * 查询数据传输对象
 * Created by liuqiang03 on 2017/6/26.
 */
public interface QueryDTO<T extends AbstractEntity> extends DTO<T> {
}
