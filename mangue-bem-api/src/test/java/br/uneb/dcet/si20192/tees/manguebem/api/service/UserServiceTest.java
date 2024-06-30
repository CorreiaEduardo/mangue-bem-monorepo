package br.uneb.dcet.si20192.tees.manguebem.api.service;

import br.uneb.dcet.si20192.tees.manguebem.api.config.SecurityConfiguration;
import br.uneb.dcet.si20192.tees.manguebem.api.dto.AuthenticationTokenDTO;
import br.uneb.dcet.si20192.tees.manguebem.api.dto.UserLoginDTO;
import br.uneb.dcet.si20192.tees.manguebem.api.dto.RegistrationDTO;
import br.uneb.dcet.si20192.tees.manguebem.api.dto.UserRegistrationDTO;
import br.uneb.dcet.si20192.tees.manguebem.api.entity.User;
import br.uneb.dcet.si20192.tees.manguebem.api.entity.enums.UserRole;
import br.uneb.dcet.si20192.tees.manguebem.api.entity.security.UserDetailsImpl;
import br.uneb.dcet.si20192.tees.manguebem.api.repository.UserRepository;
import br.uneb.dcet.si20192.tees.manguebem.api.service.security.JWTTokenService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class UserServiceTest {
    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private JWTTokenService jwtTokenService;

    @Mock
    private UserRepository userRepository;

    @Mock
    private SecurityConfiguration securityConfiguration;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UserService userService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        when(securityConfiguration.passwordEncoder()).thenReturn(passwordEncoder);
    }

    @Test
    public void testRegister() {
        // Arrange
        RegistrationDTO userRegistrationDTO = new UserRegistrationDTO("John Doe", "john@example.com", "password123", UserRole.VISITOR);
        User user = new User();
        user.setName(userRegistrationDTO.getName());
        user.setEmail(userRegistrationDTO.getEmail());
        user.setEncryptedPassword("encryptedPassword");
        user.setRole(userRegistrationDTO.getRole());

        when(passwordEncoder.encode(userRegistrationDTO.getPassword())).thenReturn("encryptedPassword");

        // Act
        userService.register(userRegistrationDTO);

        // Assert
        verify(userRepository, times(1)).save(any(User.class));
    }

    @Test
    public void testAuthenticate() {
        // Arrange
        UserLoginDTO userLoginDTO = new UserLoginDTO("john@example.com", "password123");
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(userLoginDTO.email(), userLoginDTO.password());
        Authentication authentication = mock(Authentication.class);
        UserDetailsImpl userDetails = mock(UserDetailsImpl.class);

        when(authenticationManager.authenticate(authenticationToken)).thenReturn(authentication);
        when(authentication.getPrincipal()).thenReturn(userDetails);
        when(jwtTokenService.generateToken(userDetails)).thenReturn("jwtToken");

        // Act
        AuthenticationTokenDTO tokenDTO = userService.authenticate(userLoginDTO);

        // Assert
        assertEquals("jwtToken", tokenDTO.token());
    }
}