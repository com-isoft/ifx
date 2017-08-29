package com.isoft.ifx.domain.repository;

import com.isoft.ifx.domain.annoation.Projection;
import com.isoft.ifx.domain.dto.DTO;
import com.isoft.ifx.domain.model.AbstractAggregateRoot;
import com.isoft.ifx.domain.model.AbstractEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.support.JpaEntityInformation;
import org.springframework.data.jpa.repository.support.SimpleJpaRepository;
import org.springframework.data.repository.support.PageableExecutionUtils;
import org.springframework.util.Assert;
import org.springframework.util.ReflectionUtils;
import org.springframework.util.StringUtils;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.*;
import java.lang.annotation.Annotation;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

import static org.springframework.data.jpa.repository.query.QueryUtils.toOrders;

/**
 * 仓储默认实现
 * Created by liuqiang03 on 2017/6/26.
 */
public class DefaultJpaRepository<T extends AbstractAggregateRoot> extends SimpleJpaRepository<T, String> implements JpaRepository<T> {
    private static final String ID_MUST_NOT_BE_NULL = "标识不能为空!";
    private static final String DTO_CLASS_MUST_NOT_BE_NULL = "数据传输对象类型不能为空!";
    private static final String IDS_MUST_NOT_BE_NULL = "标识集合不能为空!";
    private static final String SPEC_MUST_NOT_BE_NULL = "规约不能为空!";

    private final EntityManager entityManager;
    private static final ConcurrentHashMap<Class, Selection<?>[]> dtoSelectionMapping = new ConcurrentHashMap<>();

    public DefaultJpaRepository(JpaEntityInformation entityInformation,
                                EntityManager entityManager) {
        super(entityInformation, entityManager);

        this.entityManager = entityManager;
    }

    /**
     * 根据标识获取数据传输对象
     *
     * @param dtoClass DTO类型
     * @param id       聚合根标识
     * @return 数据传输对象
     */
    @Override
    public <D extends DTO<T>> D findOne(Class<D> dtoClass, String id) {
        Assert.notNull(id, ID_MUST_NOT_BE_NULL);
        Assert.notNull(dtoClass, DTO_CLASS_MUST_NOT_BE_NULL);

        TypedQuery<D> query = this.getQuery(new IdSpecification<>(id), null, getDomainClass(), dtoClass);

        List<D> result = query.getResultList();
        return result.size() == 0 ? null : result.get(0);
    }

    /**
     * 根据规约获取数据传输对象
     *
     * @param dtoClass DTO类型
     * @param spec     规约
     * @return 数据传输对象
     */
    @Override
    public <D extends DTO<T>> D findOne(Class<D> dtoClass, Specification<T> spec) {
        Assert.notNull(spec, SPEC_MUST_NOT_BE_NULL);
        Assert.notNull(dtoClass, DTO_CLASS_MUST_NOT_BE_NULL);

        TypedQuery<D> query = this.getQuery(spec, null, getDomainClass(), dtoClass);

        List<D> result = query.getResultList();
        return result.size() == 0 ? null : result.get(0);
    }

    /**
     * 根据标识获取数据传输对象集合
     *
     * @param dtoClass DTO类型
     * @param ids      聚合根标识集合
     * @return 数据传输对象集合
     */
    @Override
    public <D extends DTO<T>> List<D> findAllById(Class<D> dtoClass, Iterable<String> ids) {
        Assert.notNull(ids, IDS_MUST_NOT_BE_NULL);
        Assert.notNull(dtoClass, DTO_CLASS_MUST_NOT_BE_NULL);

        TypedQuery<D> query = this.getQuery(new IdsSpecification<T>(ids), null, getDomainClass(), dtoClass);

        return query.getResultList();
    }

    /**
     * 查找满足规约的数据传输对象
     *
     * @param dtoClass
     * @param spec     规约
     * @return 数据传输对象集合
     */
    @Override
    public <D extends DTO<T>> List<D> findAll(Class<D> dtoClass, Specification<T> spec) {
        Assert.notNull(dtoClass, DTO_CLASS_MUST_NOT_BE_NULL);

        TypedQuery<D> query = this.getQuery(spec, null, getDomainClass(), dtoClass);

        return query.getResultList();
    }

    /**
     * 查找满足规约的数据传输对象
     *
     * @param dtoClass
     * @param spec     规约
     * @param sort     排序器
     * @return 数据传输对象集合
     */
    @Override
    public <D extends DTO<T>> List<D> findAll(Class<D> dtoClass, Specification<T> spec, Sort sort) {
        Assert.notNull(dtoClass, DTO_CLASS_MUST_NOT_BE_NULL);

        TypedQuery<D> query = this.getQuery(spec, sort, getDomainClass(), dtoClass);

        return query.getResultList();
    }

    /**
     * 查找满足规约的数据传输对象
     *
     * @param dtoClass
     * @param spec     规约
     * @param pageable 分页对象
     * @return 分页的数据传输对象
     */
    @Override
    public <D extends DTO<T>> Page<D> findAll(Class<D> dtoClass, Specification<T> spec, Pageable pageable) {
        Assert.notNull(dtoClass, DTO_CLASS_MUST_NOT_BE_NULL);

        TypedQuery<D> query = this.getQuery(spec, pageable.getSort(), getDomainClass(), dtoClass);

        return pageable == null ? new PageImpl<>(query.getResultList())
                : readDTOPage(query, getDomainClass(), pageable, spec);
    }

    protected <D extends DTO<T>> TypedQuery<D> getQuery(Specification<T> spec, Sort sort, Class<T> domainClass, Class dtoClass) {
        CriteriaBuilder builder = entityManager.getCriteriaBuilder();
        CriteriaQuery<D> query = builder.createQuery(dtoClass);

        Root<T> root = applySpecificationToCriteria(spec, domainClass, query);

        if (dtoSelectionMapping.contains(dtoClass)) {
            query.select(builder.construct(dtoClass, dtoSelectionMapping.get(dtoClass)));
        } else {
            List<Selection<?>> selections = new ArrayList<>();

            ReflectionUtils.doWithFields(dtoClass, (field) -> {
                Annotation projection = field.getAnnotation(Projection.class);
                String alias = field.getName();
                String property = field.getName();

                if (projection == null) {
                    selections.add(root.get(property).alias(alias));
                } else if (!((Projection) projection).ignore()) {
                    String value = ((Projection) projection).property();

                    if (StringUtils.isEmpty(value)) {
                        selections.add(root.get(property).alias(alias));
                    } else {
                        Path p = root;
                        for (String pro : value.split("\\.")) {
                            p = p.get(pro);
                        }
                        selections.add(p.alias(alias));
                    }
                }
            });

            Selection<?>[] selectionArray = new Selection[selections.size()];
            selections.toArray(selectionArray);
            dtoSelectionMapping.putIfAbsent(dtoClass, selectionArray);
            query.select(builder.construct(dtoClass, selectionArray));
        }

        if (sort != null) {
            query.orderBy(toOrders(sort, root, builder));
        }

        return entityManager.createQuery(query);
    }

    protected <S, U extends T> Root<U> applySpecificationToCriteria(Specification<U> spec, Class<U> domainClass,
                                                                    CriteriaQuery<S> query) {
        Root<U> root = query.from(domainClass);

        if (spec == null) {
            return root;
        }

        CriteriaBuilder builder = entityManager.getCriteriaBuilder();
        Predicate predicate = spec.toPredicate(root, query, builder);

        if (predicate != null) {
            query.where(predicate);
        }

        return root;
    }

    protected <D extends DTO<T>> Page<D> readDTOPage(TypedQuery<D> query, final Class<T> domainClass, Pageable pageable,
                                                     final Specification<T> spec) {

        if (pageable != null) {
            query.setFirstResult(pageable.getOffset());
            query.setMaxResults(pageable.getPageSize());
        }

        return PageableExecutionUtils.getPage(query.getResultList(), pageable,
                () -> executeCountQuery(getCountQuery(spec, domainClass)));
    }

    protected static Long executeCountQuery(TypedQuery<Long> query) {

        Assert.notNull(query, "TypedQuery must not be null!");

        List<Long> totals = query.getResultList();
        Long total = 0L;

        for (Long element : totals) {
            total += element == null ? 0 : element;
        }

        return total;
    }

    public class IdSpecification<T extends AbstractEntity> implements Specification<T> {
        private String id;

        public IdSpecification(String id) {
            Assert.notNull(id, "标识不能为空！");

            this.id = id;
        }

        /**
         * 将规约转换为查找谓词
         *
         * @param root  Root
         * @param query CriteriaQuery
         * @param cb    CriteriaBuilder
         * @return 谓词
         */
        @Override
        public Predicate toPredicate(Root<T> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
            return cb.equal(root.get("id"), id);
        }
    }

    public class IdsSpecification<T extends AbstractEntity> implements Specification<T> {
        private Iterable<String> ids;

        public IdsSpecification(Iterable<String> ids) {
            Assert.notNull(ids, "标识集合不能为空！");

            this.ids = ids;
        }

        /**
         * 将规约转换为查找谓词
         *
         * @param root  Root
         * @param query CriteriaQuery
         * @param cb    CriteriaBuilder
         * @return 谓词
         */
        @Override
        public Predicate toPredicate(Root<T> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
            return root.get("id").in(ids);
        }
    }
}
