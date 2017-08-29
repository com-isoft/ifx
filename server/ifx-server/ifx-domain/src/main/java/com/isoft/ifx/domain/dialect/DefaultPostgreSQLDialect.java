package com.isoft.ifx.domain.dialect;

import org.hibernate.dialect.PostgreSQL9Dialect;
import org.hibernate.dialect.function.SQLFunctionTemplate;
import org.hibernate.type.IntegerType;

import static com.isoft.ifx.domain.constant.DomainConstant.BIT_AND_FUNCTION_NAME;
import static com.isoft.ifx.domain.constant.DomainConstant.BIT_OR_FUNCTION_NAME;

/**
 * 扩展postgresql方言
 * 添加位值操作
 */
public class DefaultPostgreSQLDialect extends PostgreSQL9Dialect {
    public DefaultPostgreSQLDialect(){
        super();
        registerFunction(BIT_AND_FUNCTION_NAME, new SQLFunctionTemplate(IntegerType.INSTANCE, "(?1 & ?2)"));
        registerFunction(BIT_OR_FUNCTION_NAME, new SQLFunctionTemplate(IntegerType.INSTANCE, "(?1 | ?2)"));
    }
}












