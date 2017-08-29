package com.isoft.ifx.web.support;

import org.springframework.boot.autoconfigure.web.BasicErrorController;
import org.springframework.boot.autoconfigure.web.ErrorAttributes;
import org.springframework.boot.autoconfigure.web.ErrorProperties;

/**
 * 错误处理控制器
 */
public class DefaultErrorController extends BasicErrorController {

    public DefaultErrorController(ErrorAttributes errorAttributes,
                                  ErrorProperties errorProperties){
        super(errorAttributes,errorProperties);
    }
}
