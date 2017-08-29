package com.isoft.ifx.domain.repository;

import com.isoft.ifx.domain.dto.DTO;
import com.isoft.ifx.domain.model.AbstractAggregateRoot;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.NoRepositoryBean;

import java.util.List;

/**
 * 仓储接口
 * Created by liuqiang03 on 2017/6/22.
 */
@NoRepositoryBean
public interface JpaRepository<T extends AbstractAggregateRoot> extends org.springframework.data.jpa.repository.JpaRepository<T, String>, JpaSpecificationExecutor<T> {
    /**
     * 根据标识获取数据传输对象
     *
     * @param dtoClass DTO类型
     * @param id       聚合根标识
     * @param <D>      DTO类型
     * @return 数据传输对象
     */
    <D extends DTO<T>> D findOne(Class<D> dtoClass, String id);

    /**
     * 根据规约获取数据传输对象
     * @param dtoClass DTO类型
     * @param spec 规约
     * @param <D> DTO类型
     * @return 数据传输对象
     */
    <D extends DTO<T>> D findOne(Class<D> dtoClass, Specification<T> spec);

    /**
     * 根据标识获取数据传输对象集合
     *
     * @param dtoClass DTO类型
     * @param ids      聚合根标识集合
     * @param <D>      DTO类型
     * @return 数据传输对象集合
     */
    <D extends DTO<T>> List<D> findAllById(Class<D> dtoClass, Iterable<String> ids);

    /**
     * 查找满足规约的数据传输对象
     *
     * @param spec 规约
     * @return 数据传输对象集合
     */
    <D extends DTO<T>> List<D> findAll(Class<D> dtoClass, Specification<T> spec);

    /**
     * 查找满足规约的数据传输对象
     *
     * @param spec 规约
     * @param sort 排序器
     * @return 数据传输对象集合
     */
    <D extends DTO<T>> List<D> findAll(Class<D> dtoClass, Specification<T> spec, Sort sort);

    /**
     * 查找满足规约的数据传输对象
     *
     * @param spec     规约
     * @param pageable 分页对象
     * @return 分页的数据传输对象
     */
    <D extends DTO<T>> Page<D> findAll(Class<D> dtoClass, Specification<T> spec, Pageable pageable);
}
