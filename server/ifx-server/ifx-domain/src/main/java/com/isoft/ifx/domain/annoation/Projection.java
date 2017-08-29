package com.isoft.ifx.domain.annoation;

import java.lang.annotation.*;

/**
 * 投射
 * Created by liuqiang03 on 2017/6/26.
 */
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Inherited
@Target({ElementType.FIELD})
public @interface Projection {
    boolean ignore() default false;

    String property() default "";
}
