package br.uneb.dcet.si20192.tees.manguebem.api.config;

import br.uneb.dcet.si20192.tees.manguebem.api.entity.enums.UserRole;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

import static java.util.Map.entry;
import static org.springframework.http.HttpMethod.*;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {

    @Autowired
    private UserAuthenticationFilter userAuthenticationFilter;

    public static final Map<String, List<HttpMethod>> PUBLIC_ENDPOINTS = Map.ofEntries(
            entry("/v1/auth/**", Arrays.asList(HEAD, GET, POST)),
            entry("/v1/species/**", Arrays.asList(HEAD, GET)),
            entry("/v1/observations/**", Arrays.asList(HEAD, GET))
    );

    public static final String[] ADMIN_ENDPOINTS = {
            "/v1/curators",
    };

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity.csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(sessionManagement -> sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(httpRegistry -> {
                    PUBLIC_ENDPOINTS.forEach((pattern, methods) -> {
                        methods.forEach(m -> {
                            httpRegistry.requestMatchers(new AntPathRequestMatcher(pattern, m.name())).permitAll();
                        });
                    });
                    httpRegistry.requestMatchers(ADMIN_ENDPOINTS).hasRole(UserRole.ADMIN.name());
                    httpRegistry.anyRequest().authenticated();
                })
                .addFilterBefore(userAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
