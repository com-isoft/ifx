package com.isoft.ifx.core.annotation;

import java.lang.annotation.*;

/**
 * 描述
 * Created by liuq on 2017/6/21.
 */
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Inherited
@Target({ElementType.FIELD, ElementType.TYPE})
public @interface Description {
    String value() default "";
}
