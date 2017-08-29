package com.isoft.ifx.web.support;

import com.isoft.ifx.web.constant.WebConstant;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.provider.token.DefaultUserAuthenticationConverter;

import java.util.Map;

public class UserTokenConverter extends DefaultUserAuthenticationConverter {
    @Override
    public Authentication extractAuthentication(Map<String, ?> map) {
        Authentication authentication = super.extractAuthentication(map);

        if (map.containsKey(WebConstant.USER_ID)) {
            authentication = new UsernamePasswordAuthenticationToken(map.get(WebConstant.USER_ID), authentication.getCredentials(), authentication.getAuthorities());
        }

        return authentication;
    }
}
