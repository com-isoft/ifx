package com.isoft.ifx.service.config;

import com.isoft.ifx.domain.repository.BitEnumRepository;
import com.isoft.ifx.service.BitEnumService;
import com.isoft.ifx.service.support.DefaultBitEnumService;
import org.dozer.DozerBeanMapper;
import org.dozer.Mapper;
import org.springframework.context.annotation.Bean;

/**
 * 应用服务层配置
 * Created by liuqiang03 on 2017/6/26.
 */
public abstract class AbstractServiceConfig {
    @Bean
    public Mapper mapper() {
        return new DozerBeanMapper();
    }

    @Bean
    public BitEnumService bitEnumService(BitEnumRepository bitEnumStore){
        return new DefaultBitEnumService(bitEnumStore);
    }
}
