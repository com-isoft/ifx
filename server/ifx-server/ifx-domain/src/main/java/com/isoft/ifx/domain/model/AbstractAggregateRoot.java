package com.isoft.ifx.domain.model;

import com.isoft.ifx.core.annotation.Description;
import org.springframework.data.domain.AfterDomainEventPublication;
import org.springframework.data.domain.DomainEvents;
import org.springframework.util.Assert;

import javax.persistence.MappedSuperclass;
import java.util.ArrayList;
import java.util.List;

/**
 * 聚合根抽象基类
 * Created by liuqiang03 on 2017/6/21.
 */
@MappedSuperclass
@Description("聚合根抽象基类")
public abstract class AbstractAggregateRoot extends AbstractEntity {
    private final transient List<Object> domainEvents = new ArrayList();

    protected <T> T registerEvent(T event) {
        Assert.notNull(event, "Domain event must not be null!");
        this.domainEvents.add(event);
        return event;
    }

    @AfterDomainEventPublication
    public void clearDomainEvents() {
        this.domainEvents.clear();
    }

    @DomainEvents
    public List<Object> getDomainEvents() {
        return this.domainEvents;
    }
}
