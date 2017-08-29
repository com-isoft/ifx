package com.isoft.ifx.domain.specification;

import com.isoft.ifx.core.filter.*;
import com.isoft.ifx.core.utils.EnumUtils;
import com.isoft.ifx.domain.model.AbstractAggregateRoot;
import org.springframework.core.convert.converter.Converter;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.Assert;

import javax.persistence.criteria.*;
import java.util.Calendar;
import java.util.Date;

import static com.isoft.ifx.domain.constant.DomainConstant.BIT_AND_FUNCTION_NAME;

/**
 * 过滤器规约
 * Created by liuqiang03 on 2017/3/2.
 */
public class FilterSpecification<T extends AbstractAggregateRoot> implements Specification<T> {
    private Filter filter;

    public FilterSpecification(Filter filter) {
        this.filter = filter;
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
        FilterToPredicateConverter converter = new FilterToPredicateConverter(root, query, cb);
        return converter.convert(filter);
    }

    class FilterToPredicateConverter implements Converter<Filter, Predicate> {
        private Root<?> root;
        private CriteriaQuery<?> query;
        private CriteriaBuilder cb;

        public FilterToPredicateConverter(Root<?> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
            this.root = root;
            this.query = query;
            this.cb = cb;
        }

        /**
         * 将筛选器转化为谓词
         *
         * @param filter 筛选器
         * @return 谓词
         */
        @Override
        public Predicate convert(Filter filter) {
            Predicate predicate = null;

            if (filter != null) {
                if (AbstractFilterItem.class.isAssignableFrom(filter.getClass())) {
                    predicate = convertFilterItem((FilterItem) filter);
                } else if (ComposedFilter.class.isAssignableFrom(filter.getClass())) {
                    predicate = convertCompoundFilter((ComposedFilter) filter);
                }
            }

            return predicate;
        }


        private Predicate convertCompoundFilter(ComposedFilter filter) {
            Connector connector = filter.getConnector();

            Predicate[] predicates = new Predicate[2];

            predicates[0] = new FilterToPredicateConverter(root, query, cb).convert(filter.getLeft());
            predicates[1] = new FilterToPredicateConverter(root, query, cb).convert(filter.getRight());

            if (connector == Connector.AND) {
                return cb.and(predicates);
            } else {
                return cb.or(predicates);
            }
        }

        /**
         * 将筛选项转化为谓词
         *
         * @param filterItem 筛选项
         * @return 谓词
         */
        private Predicate convertFilterItem(FilterItem filterItem) {
            Predicate predicate = null;

            switch (filterItem.getType()) {
                case BOOLEAN:
                    predicate = convertBooleanFilter((BooleanFilter) filterItem);
                    break;
                case STRING:
                    predicate = convertStringFilter((StringFilter) filterItem);
                    break;
                case NUMBER:
                    predicate = convertNumberFilter((NumberFilter) filterItem);
                    break;
                case DATE:
                    predicate = convertDateFilter((DateFilter) filterItem);
                    break;
            }

            return predicate;
        }

        /**
         * 将布尔筛选器转换为谓词
         *
         * @param filter 筛选器
         * @return 谓词
         */
        private Predicate convertBooleanFilter(BooleanFilter filter) {
            Predicate predicate = null;

            BooleanOperator operator = EnumUtils.parseEnum(BooleanOperator.class, filter.getOperator().getValue());
            String property = filter.getProperty();
            Object value = filter.getValue();

            switch (operator) {
                case EQ:
                    predicate = cb.equal(root.get(property), value);
                    break;
                case NEQ:
                    predicate = cb.notEqual(root.get(property), value);
                    break;
            }

            return predicate;
        }

        /**
         * 将字符串筛选器转换为谓词
         *
         * @param filter 筛选器
         * @return 谓词
         */
        @SuppressWarnings("unchecked")
        private Predicate convertStringFilter(StringFilter filter) {
            Predicate predicate = null;
            StringOperator operator = EnumUtils.parseEnum(StringOperator.class, filter.getOperator().getValue());

            String property = filter.getProperty();
            Object value = filter.getValue();
            Path left = root.get(property);

            switch (operator) {
                case EQ:
                    predicate = cb.equal(left, value);
                    break;
                case NEQ:
                    predicate = cb.notEqual(left, value);
                    break;
                case CT:
                    predicate = cb.like(left, "%" + String.valueOf(value) + "%");
                    break;
                case EW:
                    predicate = cb.like(left, "%" + String.valueOf(value));
                    break;
                case SW:
                    predicate = cb.like(left, String.valueOf(value));
                    break;
            }

            return predicate;
        }

        /**
         * 将StringFilter转换为谓词
         *
         * @param filter 筛选器
         * @return 谓词
         */
        private Predicate convertDateFilter(DateFilter filter) {
            Predicate predicate = null;

            DateOperator operator = EnumUtils.parseEnum(DateOperator.class, filter.getOperator().getValue());
            String property = filter.getProperty();
            Date value = (Date) filter.getValue();
            Path<Date> left = root.get(property);

            Calendar startDate = Calendar.getInstance();
            startDate.setTime(value);
            startDate.set(Calendar.HOUR_OF_DAY, 0);
            startDate.set(Calendar.MINUTE, 0);
            startDate.set(Calendar.SECOND, 0);
            startDate.set(Calendar.MILLISECOND, 0);

            Calendar endDate = Calendar.getInstance();

            switch (operator) {
                case EQ:
                    endDate.setTime(startDate.getTime());
                    endDate.add(Calendar.DATE, 1);
                    endDate.add(Calendar.MILLISECOND, -1);
                    predicate = cb.and(cb.greaterThanOrEqualTo(left, startDate.getTime()),
                            cb.lessThanOrEqualTo(left, endDate.getTime()));
                    break;
                case NEQ:
                    startDate.add(Calendar.MILLISECOND, -1);
                    endDate.add(Calendar.DATE, 1);
                    predicate = cb.and(cb.greaterThanOrEqualTo(left, endDate.getTime()),
                            cb.lessThanOrEqualTo(left, startDate.getTime()));
                    break;
                case GT:
                    startDate.add(Calendar.MILLISECOND, 1);
                    predicate = cb.greaterThanOrEqualTo(left, startDate.getTime());
                    break;
                case GTE:
                    predicate = cb.greaterThanOrEqualTo(left, startDate.getTime());
                    break;
                case LT:
                    startDate.add(Calendar.MILLISECOND, -1);
                    predicate = cb.lessThanOrEqualTo(left, startDate.getTime());
                    break;
                case LTE:
                    predicate = cb.lessThanOrEqualTo(left, startDate.getTime());
                    break;
            }

            return predicate;
        }

        /**
         * 将数字筛选器转换为谓词
         *
         * @param filter 筛选器
         * @return 谓词
         */
        @SuppressWarnings("unchecked")
        private Predicate convertNumberFilter(NumberFilter filter) {
            Predicate predicate = null;
            Expression<Long> expression;

            NumberOperator operator = EnumUtils.parseEnum(NumberOperator.class, filter.getOperator().getValue());
            String property = filter.getProperty();
            Object value = filter.getValue();
            Path left = root.get(property);

            switch (operator) {
                case EQ:
                    predicate = cb.equal(left, value);
                    break;
                case NEQ:
                    predicate = cb.notEqual(left, value);
                    break;
                case GT:
                    predicate = cb.gt(left, (Number) value);
                    break;
                case GTE:
                    predicate = cb.greaterThanOrEqualTo(left, (Comparable) value);
                    break;
                case LT:
                    predicate = cb.le(left, (Number) value);
                    break;
                case LTE:
                    predicate = cb.lessThanOrEqualTo(left, (Comparable) value);
                    break;
                case BI:
                    expression = cb.function(BIT_AND_FUNCTION_NAME, Long.class, left, cb.literal(value));

                    predicate = cb.equal(expression, left);
                    break;
                case BC:
                    expression = cb.function(BIT_AND_FUNCTION_NAME, Long.class, left, cb.literal(value));

                    predicate = cb.equal(expression, value);
                    break;
            }

            return predicate;
        }
    }

}
