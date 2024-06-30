package br.uneb.dcet.si20192.tees.manguebem.api.service.security;

import br.uneb.dcet.si20192.tees.manguebem.api.entity.security.UserDetailsImpl;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.List;

@Service
public class JWTTokenService {
    private final String secret;

    private final String issuer;

    public JWTTokenService(@Value("${api.security.jwt.secret}") String secret,
                           @Value("${api.security.jwt.issuer}") String issuer) {
        this.secret = secret;
        this.issuer = issuer;
    }

    public String generateToken(UserDetailsImpl user) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            List<String> userAuthorities = user.getAuthorities()
                    .stream().map(it -> it.getAuthority().replace("ROLE_", "")).toList();
            Algorithm algorithm = Algorithm.HMAC256(secret);
            return JWT.create()
                    .withIssuer(issuer)
                    .withIssuedAt(generateCreationDate())
                    .withExpiresAt(generateExpirationDate())
                    .withSubject(user.getUsername())
                    .withClaim("roles", objectMapper.writeValueAsString(userAuthorities))
                    .sign(algorithm);
        } catch (JWTCreationException | JsonProcessingException exception){
            throw new JWTCreationException("Erro ao gerar token.", exception);
        }
    }

    public String getSubjectFromToken(String token) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);
            return JWT.require(algorithm)
                    .withIssuer(issuer)
                    .build()
                    .verify(token)
                    .getSubject();
        } catch (JWTVerificationException exception){
            throw new JWTVerificationException("Token not valid");
        }
    }

    private Instant generateCreationDate() {
        return ZonedDateTime.now(ZoneId.of("America/Sao_Paulo")).toInstant();
    }

    private Instant generateExpirationDate() {
        return ZonedDateTime.now(ZoneId.of("America/Sao_Paulo")).plusHours(4).toInstant();
    }
}
