package br.uneb.dcet.si20192.tees.manguebem.api.controller;

import br.uneb.dcet.si20192.tees.manguebem.api.dto.ObservationDTO;
import br.uneb.dcet.si20192.tees.manguebem.api.dto.UFReportDTO;
import br.uneb.dcet.si20192.tees.manguebem.api.dto.basic.Page;
import br.uneb.dcet.si20192.tees.manguebem.api.entity.Observation;
import br.uneb.dcet.si20192.tees.manguebem.api.service.ObservationService;
import br.uneb.dcet.si20192.tees.manguebem.api.util.PageMapper;
import br.uneb.dcet.si20192.tees.manguebem.api.util.ReflectionUtils;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/v1/observations")
public class ObservationController {
    private final ObservationService observationService;

    public ObservationController(ObservationService observationService) {
        this.observationService = observationService;
    }

    @GetMapping("/uf-report")
    public ResponseEntity<UFReportDTO> getUFReport(@RequestParam(required = false) String specieId,
                                                   @RequestParam(required = false) String bemClassification) {
        final UFReportDTO dto = observationService.calculateUFReport(specieId, bemClassification);
        return ResponseEntity.ok(dto);
    }

    @GetMapping
    public ResponseEntity<Page<ObservationDTO>> getAll(@RequestParam(defaultValue = "0") int page,
                                                       @RequestParam(defaultValue = "20") int size,
                                                       @RequestParam MultiValueMap<String, String> parameters) {
        final Pageable paging = PageRequest.of(page, size);
        Observation example = ReflectionUtils.createObjectFromMap(Observation.class, parameters);

        final Page<ObservationDTO> allSpecies = PageMapper.of(observationService.getAll(Example.of(example), paging));
        return ResponseEntity.ok(allSpecies);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ObservationDTO> getById(@PathVariable Long id) {
        final ObservationDTO dto = observationService.getById(id);
        return ResponseEntity.ok(dto);
    }
}
