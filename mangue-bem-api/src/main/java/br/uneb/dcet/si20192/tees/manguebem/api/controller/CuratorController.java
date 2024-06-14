package br.uneb.dcet.si20192.tees.manguebem.api.controller;

import br.uneb.dcet.si20192.tees.manguebem.api.dto.CuratorRegistrationDTO;
import br.uneb.dcet.si20192.tees.manguebem.api.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1/curators")
public class CuratorController {
    private UserService userService;

    public CuratorController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<Void> createCurator(@RequestBody CuratorRegistrationDTO userRegistrationDTO) {
        userService.register(userRegistrationDTO);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
}
