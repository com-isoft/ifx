package com.isoft.ifx.web.endpoint;

import com.isoft.ifx.core.enumeration.BitEnumItem;
import com.isoft.ifx.service.BitEnumService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.provider.endpoint.FrameworkEndpoint;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@FrameworkEndpoint
@RestController
@RequestMapping(value = "/enums")
public class BitEnumEndpoint {
    private BitEnumService bitEnumService;

    @Autowired
    public BitEnumEndpoint(BitEnumService bitEnumService){
        this.bitEnumService = bitEnumService;
    }

    @GetMapping
    public List<BitEnumItem> get(@RequestParam("name") String name){
        return bitEnumService.get(name);
    }
}
