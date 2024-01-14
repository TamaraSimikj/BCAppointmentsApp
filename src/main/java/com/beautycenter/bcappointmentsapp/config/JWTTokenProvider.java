package com.beautycenter.bcappointmentsapp.config;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Date;
public class JWTTokenProvider {
    public static String generateJwtToken(UserDetails user) {
        final String SECRET = JWTAuthConstants.SECRET;
        final long EXPIRATION_TIME = JWTAuthConstants.EXPIRATION_TIME;
        final String HEADER_STRING = JWTAuthConstants.HEADER_STRING;

        Algorithm algorithm = Algorithm.HMAC256(SECRET);
        return JWT.create()
                .withSubject(user.getUsername())
                .withExpiresAt(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .withIssuer(HEADER_STRING)
                .withClaim("roles", user.getAuthorities().stream().map(Object::toString).toList())
                .sign(algorithm);
    }
}
