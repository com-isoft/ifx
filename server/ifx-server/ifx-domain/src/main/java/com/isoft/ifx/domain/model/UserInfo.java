package com.isoft.ifx.domain.model;

import org.springframework.security.core.userdetails.UserDetails;

/**
 * 用户信息接口
 */
public interface UserInfo extends UserDetails {
    /**
     * 获取用户标识
     * @return
     */
    String getId();

    /**
     * 获取用户昵称
     * @return
     */
    String getNickName();
}
