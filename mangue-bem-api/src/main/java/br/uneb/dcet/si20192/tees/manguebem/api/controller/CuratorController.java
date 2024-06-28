package br.uneb.dcet.si20192.tees.manguebem.api.controller;

import br.uneb.dcet.si20192.tees.manguebem.api.dto.CuratorRegistrationDTO;
import br.uneb.dcet.si20192.tees.manguebem.api.dto.UserDTO;
import br.uneb.dcet.si20192.tees.manguebem.api.dto.basic.Page;
import br.uneb.dcet.si20192.tees.manguebem.api.service.UserService;
import br.uneb.dcet.si20192.tees.manguebem.api.util.PageMapper;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/v1/curators")
public class CuratorController {
    private UserService userService;

    public CuratorController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<Page<UserDTO>> getAll(@RequestParam(defaultValue = "0") int page,
                                          @RequestParam(defaultValue = "20") int size,
                                          @RequestParam MultiValueMap<String, String> parameters) {
        final Pageable paging = PageRequest.of(page, size);
        final Page<UserDTO> allCurators = PageMapper.of(userService.getAll(parameters, paging));
        return ResponseEntity.ok(allCurators);
    }

    @PostMapping
    public ResponseEntity<Void> createCurator(@RequestBody CuratorRegistrationDTO userRegistrationDTO) {
        userService.register(userRegistrationDTO);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        userService.delete(id);
        return ResponseEntity.ok().build();
    }
}
