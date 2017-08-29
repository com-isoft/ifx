package com.isoft.ifx.web.support;

import com.isoft.ifx.domain.model.UserInfo;
import org.springframework.data.domain.AuditorAware;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.provider.OAuth2Authentication;

/**
 * Created by liuqiang03 on 2017/6/26.
 */
public class DefaultAuditorAware implements AuditorAware<String> {
    public String getCurrentAuditor() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            return null;
        }

        return authentication.getPrincipal().toString();
    }
}