package br.uneb.dcet.si20192.tees.manguebem.api.service;

import br.uneb.dcet.si20192.tees.manguebem.api.config.SecurityConfiguration;
import br.uneb.dcet.si20192.tees.manguebem.api.controller.dto.UserRegistrationDTO;
import br.uneb.dcet.si20192.tees.manguebem.api.controller.dto.AuthenticationTokenDTO;
import br.uneb.dcet.si20192.tees.manguebem.api.controller.dto.UserLoginDTO;
import br.uneb.dcet.si20192.tees.manguebem.api.entity.User;
import br.uneb.dcet.si20192.tees.manguebem.api.entity.security.UserDetailsImpl;
import br.uneb.dcet.si20192.tees.manguebem.api.repository.UserRepository;
import br.uneb.dcet.si20192.tees.manguebem.api.service.security.JWTTokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final AuthenticationManager authenticationManager;

    private final JWTTokenService jwtTokenService;

    private final UserRepository userRepository;

    private final SecurityConfiguration securityConfiguration;

    @Autowired
    public UserService(AuthenticationManager authenticationManager, JWTTokenService jwtTokenService, UserRepository userRepository, SecurityConfiguration securityConfiguration) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenService = jwtTokenService;
        this.userRepository = userRepository;
        this.securityConfiguration = securityConfiguration;
    }

    public void register(UserRegistrationDTO userRegistrationDTO) {
        User user = new User();
        user.setName(userRegistrationDTO.getName());
        user.setEmail(userRegistrationDTO.getEmail());
        user.setEncryptedPassword(securityConfiguration.passwordEncoder().encode(userRegistrationDTO.getPassword()));
        user.setRole(userRegistrationDTO.getRole());

        userRepository.save(user);
    }

    public AuthenticationTokenDTO authenticate(UserLoginDTO userLoginDTO) {
        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken =
                new UsernamePasswordAuthenticationToken(userLoginDTO.email(), userLoginDTO.password());

        Authentication authentication = authenticationManager.authenticate(usernamePasswordAuthenticationToken);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        return new AuthenticationTokenDTO(jwtTokenService.generateToken(userDetails));
    }
}
