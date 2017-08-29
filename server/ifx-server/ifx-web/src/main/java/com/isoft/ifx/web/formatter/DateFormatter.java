package com.isoft.ifx.web.formatter;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.core.serializer.support.SerializationFailedException;
import org.springframework.format.Formatter;

import java.text.ParseException;
import java.util.Date;
import java.util.Locale;

public class DateFormatter implements Formatter<Date> {
    ObjectMapper mapper;

    public DateFormatter(ObjectMapper mapper) {
        this.mapper = mapper;
    }

    @Override
    public Date parse(String s, Locale locale) throws ParseException {
        try {
            return mapper.readValue(s, Date.class);
        } catch (Exception ex) {
            throw new SerializationFailedException(ex.getMessage());
        }
    }

    @Override
    public String print(Date date, Locale locale) {
        try {
            return mapper.writeValueAsString(date);
        } catch (Exception ex) {
            throw new SerializationFailedException(ex.getMessage());
        }
    }
}


