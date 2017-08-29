package com.isoft.ifx.service.support;

import com.isoft.ifx.core.enumeration.BitEnumItem;
import com.isoft.ifx.domain.repository.BitEnumRepository;
import com.isoft.ifx.service.BitEnumService;
import org.springframework.util.Assert;

import java.util.List;

/**
 * 默认枚举服务实现
 */
public class DefaultBitEnumService implements BitEnumService {
    private BitEnumRepository bitEnumStore;

    public DefaultBitEnumService(BitEnumRepository bitEnumStore){
        this.bitEnumStore = bitEnumStore;
    }

    @Override
    public List<BitEnumItem> get(String name) {
        Assert.notNull(name,"枚举名称不能为空！");
        return bitEnumStore.get(name);
    }
}
