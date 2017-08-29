package com.isoft.ifx.domain.model;

import com.isoft.ifx.core.annotation.Description;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

/**
 * 审计实体抽象基类
 * Created by liuqiang03 on 2017/6/21.
 */
@MappedSuperclass
@Description("审计实体抽象基类")
@EntityListeners(AuditingEntityListener.class)
public abstract class AbstractAuditableAggregateRoot extends AbstractAggregateRoot implements Auditable {
    /**
     * 创建人标识
     */
    @CreatedBy
    @Column(length = 36, nullable = false)
    @Description("创建人标识")
    private String createdById;

    /**
     * 创建时间
     */
    @CreatedDate
    @Column(nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    @NotNull(message = "创建时间不能为空!")
    @Description("创建时间")
    private Date createdDate;

    /**
     * 最后修改人标识
     */
    @LastModifiedBy
    @Column(length = 36)
    @Description("最后修改人")
    private String lastModifiedById;

    /**
     * 最后修改时间
     */
    @LastModifiedDate
    @Temporal(TemporalType.TIMESTAMP)
    @Description("最后修改时间")
    private Date lastModifiedDate;

    /**
     * 获取创建人标识
     *
     * @return 创建人标识
     */
    @Override
    public String getCreatedById() {
        return this.createdById;
    }

    /**
     * 获取创建时间
     *
     * @return 创建时间
     */
    @Override
    public Date getCreatedDate() {
        return this.createdDate;
    }

    /**
     * 获取最后一次修改人标识
     *
     * @return 最后一次修改人标识
     */
    @Override
    public String getLastModifiedById() {
        return this.lastModifiedById;
    }

    /**
     * 获取最后一次修改时间
     *
     * @return 最后一次修改时间
     */
    @Override
    public Date getLastModifiedDate() {
        return this.lastModifiedDate;
    }

    protected void setCreatedById(String createdById) {
        this.createdById = createdById;
    }

    protected void setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
    }

    protected void setLastModifiedById(String lastModifiedById) {
        this.lastModifiedById = lastModifiedById;
    }

    protected void setLastModifiedDate(Date lastModifiedDate) {
        this.lastModifiedDate = lastModifiedDate;
    }
}
