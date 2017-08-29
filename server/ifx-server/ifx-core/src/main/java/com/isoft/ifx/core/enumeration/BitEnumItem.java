package com.isoft.ifx.core.enumeration;

import java.io.Serializable;

/**
 *
 * Created by liuqiang03 on 2017/6/27.
 */
public class BitEnumItem implements Serializable {
    private String text;
    private String name;
    private long value;

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public long getValue() {
        return value;
    }

    public void setValue(long value) {
        this.value = value;
    }
}
