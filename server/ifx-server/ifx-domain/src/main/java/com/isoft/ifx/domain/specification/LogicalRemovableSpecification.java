package com.isoft.ifx.domain.specification;

import com.isoft.ifx.domain.model.AbstractAggregateRoot;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

/**
 * 逻辑删除规约
 * @param <T>
 */
public class LogicalRemovableSpecification<T extends AbstractAggregateRoot> implements Specification<T> {
    /**
     * Creates a WHERE clause for a query of the referenced entity in form of a {@link Predicate} for the given
     * {@link Root} and {@link CriteriaQuery}.
     *
     * @param root
     * @param query
     * @param cb
     * @return a {@link Predicate}, may be {@literal null}.
     */
    @Override
    public Predicate toPredicate(Root<T> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
        return cb.equal(root.get("deleted"),false);
    }
}
