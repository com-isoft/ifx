package com.isoft.ifx.service.support;

import com.isoft.ifx.core.filter.Filter;
import com.isoft.ifx.domain.model.AbstractAggregateRoot;
import com.isoft.ifx.domain.model.LogicalRemovable;
import com.isoft.ifx.domain.repository.JpaRepository;
import com.isoft.ifx.domain.specification.FilterSpecification;
import com.isoft.ifx.domain.specification.LogicalRemovableSpecification;
import com.isoft.ifx.service.Service;
import com.isoft.ifx.service.dto.CommandDTO;
import com.isoft.ifx.service.dto.QueryDTO;
import org.dozer.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ResolvableType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.domain.Specifications;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Assert;

import javax.persistence.EntityNotFoundException;

/**
 * 应用服务抽象基类
 * Created by liuqiang03 on 2017/6/26.
 */
@Transactional(readOnly = true)
public abstract class AbstractService<T extends AbstractAggregateRoot, D extends CommandDTO<T>> implements Service<T, D> {
    private static final String ID_MUST_NOT_BE_NULL = "标识不能为空!";
    private static final String VERSION_MUST_NOT_BE_NULL = "版本号不能为空!";
    private static final String DTO_MUST_NOT_BE_NULL = "数据传输对象不能为空!";
    private static final String ENTITY_NOT_FOUND = "标识为%s的实体未找到！";

    private JpaRepository<T> repository;
    private Mapper mapper;

    /**
     * 实体类型
     */
    private Class entityClass;

    /**
     * 数据传输对象类型
     */
    private Class dtoClass;

    @Autowired
    public AbstractService(JpaRepository<T> repository, Mapper mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    protected JpaRepository<T> getRepository() {
        return repository;
    }

    protected Mapper getMapper() {
        return mapper;
    }

    /**
     * 添加聚合根dto
     *
     * @param dto 聚合根dto
     * @return 聚合根dto
     */
    @Transactional
    @Override
    public D add(D dto) {
        Assert.notNull(dto, DTO_MUST_NOT_BE_NULL);

        return getDTOFromEntity(getRepository().save(getEntityFromDTO(dto)));
    }

    /**
     * 修改聚合根dto
     *
     * @param dto 聚合根dto
     * @return 聚合根dto
     */
    @Transactional
    @Override
    public D edit(D dto) {
        Assert.notNull(dto, DTO_MUST_NOT_BE_NULL);

        T entity = getRepository().findOne(dto.getId());

        if (entity == null) {
            throw new EntityNotFoundException(String.format(ENTITY_NOT_FOUND, dto.getId()));
        }

        mapper.map(dto, entity);

        return getDTOFromEntity(getRepository().save(entity));
    }

    /**
     * 删除聚合根
     *
     * @param dto 聚合根dto
     */
    @Transactional
    @Override
    public void delete(D dto) {
        Assert.notNull(dto, DTO_MUST_NOT_BE_NULL);
        Assert.notNull(dto.getId(), ID_MUST_NOT_BE_NULL);
        Assert.notNull(dto.getVersion(), VERSION_MUST_NOT_BE_NULL);

        T entity = this.getRepository().findOne(dto.getId());

        if (entity == null) {
            throw new EntityNotFoundException(String.format(ENTITY_NOT_FOUND, dto.getId()));
        }

        entity.setVersion(dto.getVersion());

        if (isLogicalRemovable()) {
            ((LogicalRemovable) entity).setDeleted(true);

            getRepository().save(entity);
        } else {
            getRepository().delete(entity);
        }
    }

    /**
     * 根据标识获取聚合根dto
     *
     * @param id 聚合根仓储标识
     * @return 聚合根dto
     */
    @Override
    public D get(String id) {
        Assert.notNull(id, ID_MUST_NOT_BE_NULL);

        D dto = getRepository().findOne(getDTOClass(), id);

        if (dto == null) {
            throw new EntityNotFoundException(String.format(ENTITY_NOT_FOUND, id));
        }

        return dto;
    }

    /**
     * 获取分页列表dto
     *
     * @param filter   筛选器
     * @param pageable 分页对象
     * @return 分页列表dto
     */
    @Override
    public abstract <DTO extends QueryDTO<T>> Page<DTO> list(Filter filter, Pageable pageable);

    /**
     * 获取分页参照dto
     *
     * @param filter   筛选器
     * @param pageable 分页对象
     * @return 分页参照dto
     */
    @Override
    public abstract <DTO extends QueryDTO<T>> Page<DTO> lookUp(Filter filter, Pageable pageable);

    /**
     * 从聚合根中获取数据传输对象
     *
     * @param aggregateRoot 聚合根
     * @return 数据传输对象
     */
    protected D getDTOFromEntity(T aggregateRoot) {
        return getMapper().map(aggregateRoot, getDTOClass());
    }

    /**
     * 从数据传输对象中获取聚合根
     *
     * @param dto 数据传输对象
     * @return 聚合根
     */
    protected T getEntityFromDTO(D dto) {
        return getMapper().map(dto, getEntityClass());
    }

    protected <DTO extends QueryDTO> Page<DTO> findAll(Class<DTO> dtoClass, Filter filter, Pageable pageable) {
        Specification<T> specs = new FilterSpecification<>(filter);

        if (isLogicalRemovable()) {
            specs = Specifications.where(specs).and(new LogicalRemovableSpecification<>());
        }

        return this.getRepository().findAll(dtoClass, specs, pageable);
    }

    private boolean isLogicalRemovable() {
        return LogicalRemovable.class.isAssignableFrom(this.getEntityClass());
    }

    /**
     * 获取实体类型
     *
     * @return 实体类型
     */
    @SuppressWarnings("unchecked")
    protected Class<T> getEntityClass() {
        if (entityClass == null) {
            entityClass = ResolvableType.forType(this.getClass().getGenericSuperclass()).getGeneric(0).resolve();
        }

        return entityClass;
    }

    /**
     * 获取数据传输对象类型
     *
     * @return 数据传输对象类型
     */
    @SuppressWarnings("unchecked")
    protected Class<D> getDTOClass() {
        if (dtoClass == null) {
            dtoClass = ResolvableType.forType(this.getClass().getGenericSuperclass()).getGeneric(1).resolve();
        }

        return dtoClass;
    }
}
