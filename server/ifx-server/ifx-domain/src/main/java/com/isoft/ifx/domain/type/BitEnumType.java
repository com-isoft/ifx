package com.isoft.ifx.domain.type;

import com.isoft.ifx.core.enumeration.BitEnum;
import org.hibernate.HibernateException;
import org.hibernate.engine.spi.SessionImplementor;
import org.hibernate.usertype.DynamicParameterizedType;
import org.hibernate.usertype.UserType;

import java.io.Serializable;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.Properties;

/**
 * 枚举自定义类型
 * Created by Administrator on 2017/1/27.
 */
public class BitEnumType implements DynamicParameterizedType, UserType {
    private Class<? extends BitEnum> enumType;

    @SuppressWarnings("unchecked")
    public void setParameterValues(Properties properties) {
        ParameterType params = (ParameterType) properties.get(PARAMETER_TYPE);
        enumType = params.getReturnedClass();
    }

    @Override
    public int[] sqlTypes() {
        return new int[]{Types.BIGINT};
    }

    @Override
    public Class returnedClass() {
        return enumType;
    }

    @Override
    public Object nullSafeGet(ResultSet rs, String[] names, SessionImplementor sessionImplementor, Object o) throws HibernateException, SQLException {
        long value = rs.getLong(names[0]);

        if (rs.wasNull()) {
            return null;
        }

        for (Object obj : returnedClass().getEnumConstants()) {
            if (obj instanceof BitEnum) {
                if (((BitEnum) obj).getValue() == value) {
                    return obj;
                }
            }
        }

        throw new IllegalStateException("未知的值：" + returnedClass().getSimpleName());
    }

    @Override
    public void nullSafeSet(PreparedStatement st, Object value, int index, SessionImplementor sessionImplementor) throws HibernateException, SQLException {
        if (value == null) {
            st.setNull(index, Types.BIGINT);
        } else {
            st.setLong(index, ((BitEnum) value).getValue());
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
