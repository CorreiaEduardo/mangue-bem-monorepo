package br.uneb.dcet.si20192.tees.manguebem.api.config;

import br.uneb.dcet.si20192.tees.manguebem.api.entity.User;
import br.uneb.dcet.si20192.tees.manguebem.api.entity.security.UserDetailsImpl;
import br.uneb.dcet.si20192.tees.manguebem.api.repository.UserRepository;
import br.uneb.dcet.si20192.tees.manguebem.api.service.security.JWTTokenService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class UserAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JWTTokenService jwtTokenService;

    @Autowired
    private UserRepository userRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        if (isEndpointNotPublic(request)) {
            String token = parseToken(request);
            if (token != null) {
                String subject = jwtTokenService.getSubjectFromToken(token);
                User user = userRepository
                        .findByEmail(subject)
                        .orElseThrow(() -> new HttpClientErrorException(HttpStatus.FORBIDDEN, "Token is not valid"));
                UserDetailsImpl userDetails = new UserDetailsImpl(user);

                Authentication authentication =
                        new UsernamePasswordAuthenticationToken(userDetails.getUser(), token, userDetails.getAuthorities());

                SecurityContextHolder.getContext().setAuthentication(authentication);
            } else {
                throw new HttpClientErrorException(HttpStatus.FORBIDDEN, "Token is missing");
            }
        }
        filterChain.doFilter(request, response);
    }

    private String parseToken(HttpServletRequest request) {
        String authorizationHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        if (authorizationHeader != null) {
            return authorizationHeader.replace("Bearer ", "");
        }
        return null;
    }

    private boolean isEndpointNotPublic(final HttpServletRequest request) {
        final String requestURI = request.getRequestURI();
        final AntPathMatcher matcher = new AntPathMatcher();

        return !SecurityConfiguration.PUBLIC_ENDPOINTS
                .entrySet()
                .stream()
                .anyMatch(entry -> matcher.match(entry.getKey(), requestURI) && entry.getValue().contains(HttpMethod.valueOf(request.getMethod())));
    }
}
