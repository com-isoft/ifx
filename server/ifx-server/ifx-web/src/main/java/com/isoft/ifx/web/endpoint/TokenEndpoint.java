package com.isoft.ifx.web.endpoint;

import org.apache.commons.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.common.OAuth2AccessToken;
import org.springframework.security.oauth2.provider.authentication.OAuth2AuthenticationDetails;
import org.springframework.security.oauth2.provider.endpoint.FrameworkEndpoint;
import org.springframework.security.oauth2.provider.token.DefaultTokenServices;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.context.request.RequestContextHolder;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

@FrameworkEndpoint
@RestController
@RequestMapping(value = "/tokens")
public class TokenEndpoint {
    private static final String USER_NAME = "username";
    private static final String USER_PASSWORD = "password";

    @Autowired
    DefaultTokenServices tokenServices;

    @Value("${security.oauth2.client.client-id}")
    private String oAuth2ClientId;

    @Value("${security.oauth2.client.client-secret}")
    private String oAuth2ClientSecret;

    @Value("${security.oauth2.client.access-token-uri}")
    private String accessTokenUri;

    @PostMapping
    public ResponseEntity<OAuth2AccessToken> create(@RequestBody Map<String, String> data) {
        if (!data.containsKey(USER_NAME)) {
            throw new IllegalArgumentException("用户名不能为空！");
        }

        if (!data.containsKey(USER_PASSWORD)) {
            throw new IllegalArgumentException("密码不能为空!");
        }

        RestTemplate template = new RestTemplate();
        String basic = oAuth2ClientId + ":" + oAuth2ClientSecret;

        HttpHeaders requestHeaders = new HttpHeaders();
        requestHeaders.add("Content-Type", "application/x-www-form-urlencoded");
        requestHeaders.add("Authorization", "Basic " + Base64.encodeBase64String(basic.getBytes()));

        String params = String.format("grant_type=password&username=%s&password=%s&client_id=%s&client_secret=%s", data.get(USER_NAME), data.get(USER_PASSWORD), oAuth2ClientId, oAuth2ClientSecret);
        HttpEntity<String> requestEntity = new HttpEntity<>(params, requestHeaders);

        return template.exchange(accessTokenUri, HttpMethod.POST, requestEntity, OAuth2AccessToken.class);
    }

    @PostMapping("/refresh")
    public ResponseEntity<OAuth2AccessToken> refresh(@RequestBody String refreshToken) {
        String accessToken = String.valueOf(RequestContextHolder.getRequestAttributes().getAttribute(OAuth2AuthenticationDetails.ACCESS_TOKEN_VALUE, 0));

        RestTemplate template = new RestTemplate();
        String basic = oAuth2ClientId + ":" + oAuth2ClientSecret;

        HttpHeaders requestHeaders = new HttpHeaders();
        requestHeaders.add("Content-Type", "application/x-www-form-urlencoded");
        requestHeaders.add("Authorization", "Basic " + Base64.encodeBase64String(basic.getBytes()));

        String params = String.format("grant_type=refresh_token&access_token=%s&refresh_token=%s", accessToken, refreshToken);
        HttpEntity<String> requestEntity = new HttpEntity<>(params, requestHeaders);

        ResponseEntity<OAuth2AccessToken> responseEntity = template.exchange(accessTokenUri, HttpMethod.POST, requestEntity, OAuth2AccessToken.class);

        return responseEntity;
    }
}
