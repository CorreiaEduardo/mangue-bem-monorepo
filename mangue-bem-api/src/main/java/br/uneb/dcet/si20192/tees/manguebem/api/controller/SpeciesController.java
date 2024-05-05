package br.uneb.dcet.si20192.tees.manguebem.api.controller;

import br.uneb.dcet.si20192.tees.manguebem.api.dto.SpecieDTO;
import br.uneb.dcet.si20192.tees.manguebem.api.service.SpecieService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/v1/species")
public class SpeciesController {
    private final SpecieService specieService;

    public SpeciesController(SpecieService specieService) {
        this.specieService = specieService;
    }

    @PostMapping
    public ResponseEntity<SpecieDTO> create(@RequestBody SpecieDTO specieDTO) {
        final SpecieDTO createdSpecie = specieService.create(specieDTO);
        return new ResponseEntity<>(createdSpecie, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<SpecieDTO>> getAll() {
        final List<SpecieDTO> allSpecies = specieService.getAll();
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

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        specieService.delete(id);
        return ResponseEntity.ok().build();
    }
}
