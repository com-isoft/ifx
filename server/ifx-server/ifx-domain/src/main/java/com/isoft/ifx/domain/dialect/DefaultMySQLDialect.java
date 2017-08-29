package com.isoft.ifx.domain.dialect;

import org.hibernate.dialect.MySQLDialect;
import org.hibernate.dialect.function.SQLFunctionTemplate;
import org.hibernate.type.IntegerType;

import static com.isoft.ifx.domain.constant.DomainConstant.*;

/**
 * 扩展mysql方言
 * 添加位值操作
 */
public class DefaultMySQLDialect extends MySQLDialect {
    public DefaultMySQLDialect(){
        super();
        registerFunction(BIT_AND_FUNCTION_NAME, new SQLFunctionTemplate(IntegerType.INSTANCE, "(?1 & ?2)"));
        registerFunction(BIT_OR_FUNCTION_NAME, new SQLFunctionTemplate(IntegerType.INSTANCE, "(?1 | ?2)"));
    }
}
