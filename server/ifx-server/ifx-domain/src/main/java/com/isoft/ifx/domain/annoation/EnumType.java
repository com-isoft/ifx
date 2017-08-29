package com.isoft.ifx.domain.annoation;

import java.lang.annotation.*;

/**
 * 枚举类型
 * Created by liuqiang03 on 2017/6/23.
 */
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Inherited
@Target({ElementType.FIELD})
public @interface EnumType {
    String type() default "";
}
