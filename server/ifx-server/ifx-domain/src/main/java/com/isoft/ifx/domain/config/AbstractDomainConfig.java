package com.isoft.ifx.domain.config;

import com.isoft.ifx.domain.repository.DefaultBitEnumRepository;
import com.isoft.ifx.domain.repository.BitEnumRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

/**
 * 领域配置
 * Created by liuqiang03 on 2017/6/26.
 */
@EnableJpaAuditing
public abstract class AbstractDomainConfig {
    @Bean
    public BitEnumRepository bitEnumStore(){
        return new DefaultBitEnumRepository(getBitEnumBasePackages());
    }

    protected abstract String[] getBitEnumBasePackages();
}
