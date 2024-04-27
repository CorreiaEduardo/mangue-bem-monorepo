package br.uneb.dcet.si20192.tees.manguebemapi.controller;

import br.uneb.dcet.si20192.tees.manguebemapi.controller.dto.AuthenticationTokenDTO;
import br.uneb.dcet.si20192.tees.manguebemapi.controller.dto.UserLoginDTO;
import br.uneb.dcet.si20192.tees.manguebemapi.controller.dto.UserRegistrationDTO;
import br.uneb.dcet.si20192.tees.manguebemapi.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<AuthenticationTokenDTO> login(@RequestBody UserLoginDTO userLoginDTO) {
        AuthenticationTokenDTO token = userService.authenticate(userLoginDTO);
        return new ResponseEntity<>(token, HttpStatus.OK);
    }

    @PostMapping("/register")
    public ResponseEntity<Void> register(@RequestBody UserRegistrationDTO userRegistrationDTO) {
        userService.register(userRegistrationDTO);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
}
