package br.uneb.dcet.si20192.tees.manguebem.api.controller;

import br.uneb.dcet.si20192.tees.manguebem.api.dto.CreateSpecieDTO;
import br.uneb.dcet.si20192.tees.manguebem.api.dto.SpecieDTO;
import br.uneb.dcet.si20192.tees.manguebem.api.dto.basic.Page;
import br.uneb.dcet.si20192.tees.manguebem.api.service.SpecieService;
import br.uneb.dcet.si20192.tees.manguebem.api.util.PageMapper;
import jakarta.validation.Valid;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/v1/species")
public class SpeciesController {
    private final SpecieService specieService;

    public SpeciesController(SpecieService specieService) {
        this.specieService = specieService;
    }

    @PostMapping
    public ResponseEntity<SpecieDTO> create(@RequestBody @Valid CreateSpecieDTO createSpecieDTO) {
        final SpecieDTO createdSpecie = specieService.create(createSpecieDTO);
        return new ResponseEntity<>(createdSpecie, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<Page<SpecieDTO>> getAll(@RequestParam(defaultValue = "0") int page,
                                                  @RequestParam(defaultValue = "20") int size,
                                                  @RequestParam MultiValueMap<String, String> parameters) {
        final Pageable paging = PageRequest.of(page, size);
        final Page<SpecieDTO> allSpecies = PageMapper.of(specieService.getAll(parameters, paging));
        return ResponseEntity.ok(allSpecies);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SpecieDTO> getById(@PathVariable Long id) {
        final SpecieDTO specieDTO = specieService.getById(id);
        return ResponseEntity.ok(specieDTO);
    }

    @PutMapping("/{id}")
    public ResponseEntity<SpecieDTO> update(@PathVariable Long id, @RequestBody SpecieDTO specieDTO) {
        specieDTO.setId(id);
        final SpecieDTO updatedSpecie = specieService.update(specieDTO);

        return ResponseEntity.ok(updatedSpecie);
    }

    @PostMapping("/{id}/approve")
    public ResponseEntity<SpecieDTO> approve(@PathVariable Long id) {
        final SpecieDTO updatedSpecie = specieService.approve(id);

        return ResponseEntity.ok(updatedSpecie);
    }

    @PostMapping("/{id}/reprove")
    public ResponseEntity<SpecieDTO> reprove(@PathVariable Long id) {
        final SpecieDTO updatedSpecie = specieService.reprove(id);

        return ResponseEntity.ok(updatedSpecie);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        specieService.delete(id);
        return ResponseEntity.ok().build();
    }
}
