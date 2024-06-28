package br.uneb.dcet.si20192.tees.manguebem.api.service;

import br.uneb.dcet.si20192.tees.manguebem.api.config.SecurityConfiguration;
import br.uneb.dcet.si20192.tees.manguebem.api.dto.AuthenticationTokenDTO;
import br.uneb.dcet.si20192.tees.manguebem.api.dto.RegistrationDTO;
import br.uneb.dcet.si20192.tees.manguebem.api.dto.UserDTO;
import br.uneb.dcet.si20192.tees.manguebem.api.dto.UserLoginDTO;
import br.uneb.dcet.si20192.tees.manguebem.api.entity.User;
import br.uneb.dcet.si20192.tees.manguebem.api.entity.security.UserDetailsImpl;
import br.uneb.dcet.si20192.tees.manguebem.api.repository.UserRepository;
import br.uneb.dcet.si20192.tees.manguebem.api.service.basic.BaseService;
import br.uneb.dcet.si20192.tees.manguebem.api.service.security.JWTTokenService;
import org.springframework.data.jpa.repository.support.JpaRepositoryImplementation;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
public class UserService extends BaseService<User, UserDTO>  {

    private final AuthenticationManager authenticationManager;

    private final JWTTokenService jwtTokenService;

    private final UserRepository userRepository;

    private final SecurityConfiguration securityConfiguration;

    public UserService(AuthenticationManager authenticationManager, JWTTokenService jwtTokenService, UserRepository userRepository, SecurityConfiguration securityConfiguration) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenService = jwtTokenService;
        this.userRepository = userRepository;
        this.securityConfiguration = securityConfiguration;
    }

    public void register(RegistrationDTO userRegistrationDTO) {
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

    @Override
    public Class<User> getEntityClass() {
        return User.class;
    }

    @Override
    protected JpaRepositoryImplementation<User, Long> getRepository() {
        return this.userRepository;
    }

    @Override
    protected UserDTO convert(User entity) {
        UserDTO dto = new UserDTO();

        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setEmail(entity.getEmail());
        dto.setRole(entity.getRole());

        return dto;
    }

    @Override
    protected User convert(UserDTO dto) {
        return null;
    }
}
