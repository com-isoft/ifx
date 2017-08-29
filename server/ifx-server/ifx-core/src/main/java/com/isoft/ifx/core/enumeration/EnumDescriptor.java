package com.isoft.ifx.core.enumeration;

import java.lang.annotation.*;

/**
 * Created by liuqiang03 on 2017/6/27.
 */
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.TYPE})
public @interface EnumDescriptor {
    String name() default "";

    String text() default "";

    String description() default "";
}
