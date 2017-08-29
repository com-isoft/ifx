package com.isoft.ifx.service;

import com.isoft.ifx.core.filter.Filter;
import com.isoft.ifx.domain.model.AbstractAggregateRoot;
import com.isoft.ifx.service.dto.CommandDTO;
import com.isoft.ifx.service.dto.QueryDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * 应用服务接口
 * Created by liuq on 2017/2/25.
 */
public interface Service<T extends AbstractAggregateRoot, D extends CommandDTO<T>> {
    /**
     * 添加聚合根dto
     *
     * @param dto 聚合根dto
     * @return 聚合根dto
     */
    D add(D dto);

    /**
     * 修改聚合根dto
     *
     * @param dto 聚合根dto
     * @return 聚合根dto
     */
    D edit(D dto);

    /**
     * 删除聚合根
     *
     * @param dto 聚合根dto
     */
    void delete(D dto);

    /**
     * 根据标识获取聚合根dto
     *
     * @param id 聚合根仓储标识
     * @return 聚合根dto
     */
    D get(String id);

    /**
     * 获取分页列表dto
     *
     * @param filter   筛选器
     * @param pageable 分页对象
     * @return 分页列表dto
     */
    <DTO extends QueryDTO<T>> Page<DTO> list(Filter filter, Pageable pageable);

    /**
     * 获取分页参照dto
     *
     * @param filter   筛选器
     * @param pageable 分页对象
     * @return 分页参照dto
     */
    <DTO extends QueryDTO<T>> Page<DTO> lookUp(Filter filter, Pageable pageable);
}