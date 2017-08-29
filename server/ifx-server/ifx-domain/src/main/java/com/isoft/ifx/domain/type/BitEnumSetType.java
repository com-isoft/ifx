package com.isoft.ifx.domain.type;

import com.isoft.ifx.core.enumeration.BitEnum;
import com.isoft.ifx.core.utils.EnumSetUtils;
import com.isoft.ifx.domain.annoation.EnumType;
import org.hibernate.HibernateException;
import org.hibernate.annotations.common.reflection.ClassLoadingException;
import org.hibernate.engine.spi.SessionImplementor;
import org.hibernate.usertype.DynamicParameterizedType;
import org.hibernate.usertype.UserType;

import java.io.Serializable;
import java.lang.annotation.Annotation;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.EnumSet;
import java.util.Properties;

/**
 * 枚举集合自定义类型
 * Created by liuqiang03 on 2017/6/22.
 */
public class BitEnumSetType implements DynamicParameterizedType, UserType {
    private Class enumType;

    @SuppressWarnings("unchecked")
    public void setParameterValues(Properties properties) {
        boolean hasEnumType = false;

        ParameterType params = (ParameterType) properties.get(PARAMETER_TYPE);

        for (Annotation annotation : params.getAnnotationsMethod()) {
            if (annotation.annotationType() == EnumType.class) {
                hasEnumType = true;
                String className = ((EnumType) annotation).type();
                try {
                    enumType = Class.forName(className);
                    break;
                } catch (Exception e) {
                    throw new ClassLoadingException(className + "无法加载!");
                }
            }
        }

        if (!hasEnumType) {
            throw new RuntimeException("缺少枚举类型注解EnumType！");
        }
    }

    @Override
    public int[] sqlTypes() {
        return new int[]{Types.BIGINT};
    }

    @Override
    public Class returnedClass() {
        return EnumSet.class;
    }

    @Override
    public Object nullSafeGet(ResultSet rs, String[] names, SessionImplementor sessionImplementor, Object o) throws HibernateException, SQLException {
        long value = rs.getLong(names[0]);

        if (rs.wasNull()) {
            return null;
        }

        return EnumSetUtils.setOf(value, enumType);
    }

    @Override
    public void nullSafeSet(PreparedStatement st, Object value, int index, SessionImplementor sessionImplementor) throws HibernateException, SQLException {
        EnumSet<? extends BitEnum> data = (EnumSet) value;

        if (value == null || data.size() == 0) {
            st.setNull(index, Types.BIGINT);
        } else {
            st.setLong(index, EnumSetUtils.valueOf(data));
        }
    }

    @Override
    public Object deepCopy(Object value) throws HibernateException {
        return value;
    }

    @Override
    public boolean isMutable() {
        return false;
    }

    @Override
    public Serializable disassemble(Object value) throws HibernateException {
        return (Serializable) value;
    }

    @Override
    public Object assemble(Serializable cached, Object o) throws HibernateException {
        return cached;
    }

    @Override
    public Object replace(Object original, Object target, Object owner) throws HibernateException {
        return original;
    }

    @Override
    public boolean equals(Object x, Object y) throws HibernateException {
        return x == y;
    }

    @Override
    public int hashCode(Object o) throws HibernateException {
        return o == null ? 0 : o.hashCode();
    }
}
