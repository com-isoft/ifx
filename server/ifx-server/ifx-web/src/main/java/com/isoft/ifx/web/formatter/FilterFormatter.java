package com.isoft.ifx.web.formatter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.isoft.ifx.core.filter.Filter;
import org.springframework.core.serializer.support.SerializationFailedException;
import org.springframework.format.Formatter;

import java.text.ParseException;
import java.util.Locale;

/**
 * FilterFormatter
 * Created by liuqiang03 on 2017/3/14.
 */
public class FilterFormatter implements Formatter<Filter> {
    ObjectMapper mapper;

    public FilterFormatter(ObjectMapper mapper) {
        this.mapper = mapper;
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
    public Filter parse(String text, Locale locale) throws ParseException {
        try {
            return mapper.readValue(text, Filter.class);
        } catch (Exception ex) {
            throw new SerializationFailedException(ex.getMessage());
        }
    }

    /**
     * Print the object of type T for display.
     *
     * @param filter the instance to print
     * @param locale the current user locale
     * @return the printed text string
     */
    @Override
    public String print(Filter filter, Locale locale) {
        try {
            return mapper.writeValueAsString(filter);
        } catch (Exception ex) {
            throw new SerializationFailedException(ex.getMessage());
        }
    }
}