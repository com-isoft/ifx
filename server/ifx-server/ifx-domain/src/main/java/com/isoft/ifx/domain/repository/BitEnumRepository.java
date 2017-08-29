package com.isoft.ifx.domain.repository;

import com.isoft.ifx.core.enumeration.BitEnumItem;

import java.util.List;

/**
 * 枚举仓储
 * Created by liuqiang03 on 2017/6/27.
 */
public interface BitEnumRepository {
    /**
     * 获取枚举明细
     * @param name
     * @return
     */
    List<BitEnumItem> get(String name);
}
