package com.beautycenter.bcappointmentsapp.config;

public class JWTAuthConstants {

    public static final long EXPIRATION_TIME = 864_000_000; // 10 days
    public static final String SECRET = "s3cr3tk3y";
    public static final String HEADER_STRING = "Authorization";
    public static final String TOKEN_PREFIX = "Bearer";

}