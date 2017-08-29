package com.isoft.ifx.web.config;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.*;
import com.fasterxml.jackson.databind.deser.BeanDeserializerModifier;
import com.fasterxml.jackson.databind.module.SimpleModule;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;
import com.isoft.ifx.core.enumeration.BitEnum;
import com.isoft.ifx.core.filter.Filter;
import com.isoft.ifx.core.utils.EnumUtils;
import com.isoft.ifx.service.BitEnumService;
import com.isoft.ifx.web.endpoint.BitEnumEndpoint;
import com.isoft.ifx.web.endpoint.TokenEndpoint;
import com.isoft.ifx.web.filter.CrossOriginFilter;
import com.isoft.ifx.web.formatter.DateFormatter;
import com.isoft.ifx.web.formatter.EnumConverterFactory;
import com.isoft.ifx.web.formatter.FilterFormatter;
import com.isoft.ifx.web.formatter.SortFormatter;
import com.isoft.ifx.web.serialization.FilterDeserializer;
import com.isoft.ifx.web.serialization.SortDeserializer;
import com.isoft.ifx.web.support.DefaultAuditorAware;
import com.isoft.ifx.web.support.DefaultErrorAttributes;
import com.isoft.ifx.web.support.DefaultErrorController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.web.ErrorAttributes;
import org.springframework.boot.autoconfigure.web.ErrorController;
import org.springframework.boot.autoconfigure.web.ServerProperties;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.domain.Sort;
import org.springframework.format.FormatterRegistry;
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import java.io.IOException;

/**
 * Created by liuqiang03 on 2017/6/27.
 */
public abstract class AbstractWebConfig extends WebMvcConfigurerAdapter {
    @Autowired
    ServerProperties serverProperties;

    @Bean
    public ObjectMapper objectMapper() {
        Jackson2ObjectMapperBuilder builder = new Jackson2ObjectMapperBuilder();
        builder.modules(simpleModule());
        registerDeserializer(builder);
        registerSerializer(builder);

        return builder.build();
    }

    @Bean
    public FilterRegistrationBean filterRegistrationBean() {
        FilterRegistrationBean registration = new FilterRegistrationBean(crossOriginFilter());
        registration.setOrder(-1);
        return registration;
    }

    @Bean
    public TokenEndpoint sessionEndpoint(){
        return new TokenEndpoint();
    }

    @Bean
    public BitEnumEndpoint bitEnumEndpoint(BitEnumService bitEnumService){
        return new BitEnumEndpoint(bitEnumService);
    }

    @Bean
    public AuditorAware auditorAware(){
        return new DefaultAuditorAware();
    }

    @Bean
    public ErrorAttributes errorProperties() {
        return new DefaultErrorAttributes();
    }

    @Bean
    public ErrorController errorController(ErrorAttributes errorAttributes) {
        return new DefaultErrorController(errorAttributes, serverProperties.getError());
    }

    private CrossOriginFilter crossOriginFilter(){
        return new CrossOriginFilter();
    }

    /**
     * 添加Formatter
     *
     * @param registry registry
     */
    @Override
    public void addFormatters(FormatterRegistry registry) {
        registry.addFormatter(new FilterFormatter(objectMapper()));
        registry.addFormatter(new SortFormatter(objectMapper()));
        registry.addFormatter(new DateFormatter(objectMapper()));
        registry.addConverterFactory(new EnumConverterFactory(objectMapper()));
    }

    /**
     * 注册反序列化器
     *
     * @param builder builder
     */
    public void registerDeserializer(Jackson2ObjectMapperBuilder builder) {
        builder.deserializerByType(Filter.class, new FilterDeserializer());
        builder.deserializerByType(Sort.class, new SortDeserializer());
    }

    /**
     * 注册序列化器
     *
     * @param builder
     */
    public void registerSerializer(Jackson2ObjectMapperBuilder builder) {
    }

    private SimpleModule simpleModule() {
        SimpleModule module = new SimpleModule();

        module.setDeserializerModifier(new BeanDeserializerModifier() {
            @Override
            public JsonDeserializer<Enum> modifyEnumDeserializer(DeserializationConfig config,
                                                                 final JavaType type,
                                                                 BeanDescription beanDesc,
                                                                 final JsonDeserializer<?> deserializer) {
                return new JsonDeserializer<Enum>() {
                    @Override
                    public Enum deserialize(JsonParser jp, DeserializationContext ctxt) throws IOException {
                        Class rawClass = type.getRawClass();

                        return EnumUtils.parseEnum(rawClass, jp.getLongValue());
                    }
                };
            }
        });

        module.addSerializer(Enum.class, new StdSerializer<Enum>(Enum.class) {
            @Override
            public void serialize(Enum value, JsonGenerator jgen, SerializerProvider provider) throws IOException {
                if (BitEnum.class.isAssignableFrom(value.getClass())) {
                    jgen.writeNumber(((BitEnum) value).getValue());
                } else {
                    jgen.writeNumber(value.ordinal());
                }
            }
        });

        return module;
    }
}
