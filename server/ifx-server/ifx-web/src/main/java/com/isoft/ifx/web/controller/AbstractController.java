package com.isoft.ifx.web.controller;

import com.isoft.ifx.core.filter.Filter;
import com.isoft.ifx.domain.model.AbstractAggregateRoot;
import com.isoft.ifx.service.Service;
import com.isoft.ifx.service.dto.CommandDTO;
import com.isoft.ifx.service.dto.QueryDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ResolvableType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Max;
import javax.validation.constraints.NotNull;

/**
 * 控制器抽象基类
 * Created by liuqiang03 on 2017/6/27.
 */
public abstract class AbstractController<T extends AbstractAggregateRoot, D extends CommandDTO<T>> {
    private Service<T, D> service;
    private Class<D> dtoClass;

    @Autowired
    public AbstractController(Service<T, D> service) {
        this.service = service;
    }

    protected Service<T, D> getService() {
        return this.service;
    }

    /**
     * 添加聚合根dto
     *
     * @param dto 聚合根dto
     * @return 聚合根dto
     */
    @PostMapping
    public D add(@RequestBody D dto) {
        return getService().add(dto);
    }

    /**
     * 修改聚合根dto
     *
     * @param dto 聚合根dto
     * @return 聚合根dto
     */
    @PutMapping("/{id}")
    public D edit(@PathVariable String id
            , @RequestHeader("If-None-Match") long version
            , @RequestBody D dto) {
        dto.setId(id);
        dto.setVersion(version);
        return getService().edit(dto);
    }

    /**
     * 删除聚合根
     *
     * @param id 聚合根dto
     */
    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id
            , @RequestHeader("If-None-Match") long version) throws Exception {
        D dto = getDTOClass().newInstance();

        dto.setId(id);
        dto.setVersion(version);
        getService().delete(dto);
    }

    /**
     * 根据标识获取聚合根dto
     *
     * @param id 聚合根仓储标识
     * @return 聚合根dto
     */
    @GetMapping("/{id}")
    public D get(@PathVariable @NotNull String id) {
        return getService().get(id);
    }

    @GetMapping
    public <ListDTO extends QueryDTO> Page<ListDTO> list(@RequestParam(value = "filter", required = false) Filter filter
            , @RequestParam(value = "page") int pageNumber
            , @RequestParam(value = "limit") @Max(10000) int pageSize
            , @RequestParam(value = "sort", required = false) Sort sort) {
        return getService().list(filter, new PageRequest(pageNumber - 1, pageSize, sort));
    }

    @GetMapping("/lookup")
    public <ListDTO extends QueryDTO> Page<ListDTO> lookUp(@RequestParam(value = "filter", required = false) Filter filter
            , @RequestParam(value = "page") int pageNumber
            , @RequestParam(value = "limit") @Max(10000) int pageSize
            , @RequestParam(value = "sort", required = false) Sort sort) {
        return getService().lookUp(filter, new PageRequest(pageNumber - 1, pageSize, sort));
    }

    /**
     * 获取dto类型
     *
     * @return
     */
    protected Class<D> getDTOClass() {
        if (dtoClass == null) {
            dtoClass = (Class<D>) ResolvableType.forType(this.getClass().getGenericSuperclass()).getGeneric(1).resolve();
        }

        return dtoClass;
    }
}
