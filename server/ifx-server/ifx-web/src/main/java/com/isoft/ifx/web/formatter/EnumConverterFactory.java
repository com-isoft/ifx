package com.isoft.ifx.web.formatter;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.core.convert.converter.Converter;
import org.springframework.core.convert.converter.ConverterFactory;
import org.springframework.core.serializer.support.SerializationFailedException;

/**
 * Created by liuqiang03 on 2017/6/27.
 */
public class EnumConverterFactory implements ConverterFactory<String, Enum> {
    private ObjectMapper objectMapper;

    public EnumConverterFactory(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    /**
     * Get the converter to convert from S to target type T, where T is also an instance of R.
     *
     * @param targetType the target type to convert to
     * @return a converter from S to T
     */
    @Override
    public <T extends Enum> Converter<String, T> getConverter(Class<T> targetType) {
        return source -> {
            try {
                return objectMapper.readValue(source, targetType);
            } catch (Exception ex) {
                throw new SerializationFailedException(ex.getMessage());
            }
        };
    }
}
