package com.isoft.ifx.service;

import com.isoft.ifx.core.enumeration.BitEnumItem;

import java.util.List;

/**
 * 枚举服务接口
 */
public interface BitEnumService {
    List<BitEnumItem> get(String name);
}
