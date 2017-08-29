package com.isoft.ifx.web.formatter;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.core.serializer.support.SerializationFailedException;
import org.springframework.data.domain.Sort;
import org.springframework.format.Formatter;

import java.text.ParseException;
import java.util.Locale;

/**
 * Created by liuqiang03 on 2017/6/27.
 */
public class SortFormatter implements Formatter<Sort> {
    private ObjectMapper objectMapper;

    public SortFormatter(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    /**
     * Parse a text String to produce a T.
     *
     * @param text   the text string
     * @param locale the current user locale
     * @return an instance of T
     * @throws ParseException           when a parse exception occurs in a java.text parsing library
     * @throws IllegalArgumentException when a parse exception occurs
     */
    @Override
    public Sort parse(String text, Locale locale) throws ParseException {
        try {
            return objectMapper.readValue(text, Sort.class);
        } catch (Exception ex) {
            throw new SerializationFailedException(ex.getMessage());
        }
    }

    /**
     * Print the object of type T for display.
     *
     * @param sort   the instance to print
     * @param locale the current user locale
     * @return the printed text string
     */
    @Override
    public String print(Sort sort, Locale locale) {
        try {
            return objectMapper.writeValueAsString(sort);
        } catch (Exception ex) {
            throw new SerializationFailedException(ex.getMessage());
        }
    }
}

