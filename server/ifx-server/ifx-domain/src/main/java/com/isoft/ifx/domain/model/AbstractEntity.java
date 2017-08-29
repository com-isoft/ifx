package com.isoft.ifx.domain.model;

import com.isoft.ifx.core.annotation.Description;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.data.domain.Persistable;
import org.springframework.util.ClassUtils;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

/**
 * 实体抽象基类
 * Created by liuqiang03 on 2017/6/21.
 */
@MappedSuperclass
@Description("实体抽象基类")
public abstract class AbstractEntity implements Persistable<String>, Serializable {
    /**
     * 仓储标识
     */
    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    @Column(length = 36, nullable = false)
    @NotNull(message = "标识不能为空!")
    @Description("标识")
    private String id;

    /**
     * 版本号
     */
    @Version
    @NotNull(message = "数据版本号不能为空!")
    @Description("版本号")
    private long version;

    @Override
    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public long getVersion() {
        return this.version;
    }

    public void setVersion(long version) {
        this.version = version;
    }

    @Transient
    public boolean isNew() {
        return null == this.getId();
    }

    public boolean equals(Object obj) {
        if (null == obj) {
            return false;
        } else if (this == obj) {
            return true;
        } else if (!this.getClass().equals(ClassUtils.getUserClass(obj))) {
            return false;
        } else {
            AbstractEntity that = (AbstractEntity) obj;
            return null == this.getId() ? false : this.getId().equals(that.getId());
        }
    }

    public int hashCode() {
        int hashCode = 17;

        hashCode += null == getId() ? 0 : getId().hashCode() * 31;

        return hashCode;
    }
}
