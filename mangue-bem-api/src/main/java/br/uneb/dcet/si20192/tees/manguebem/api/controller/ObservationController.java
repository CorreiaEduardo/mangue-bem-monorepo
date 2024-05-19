package br.uneb.dcet.si20192.tees.manguebem.api.controller;

import br.uneb.dcet.si20192.tees.manguebem.api.dto.UFReportDTO;
import br.uneb.dcet.si20192.tees.manguebem.api.service.ObservationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1/observations")
public class ObservationController {
    private final ObservationService observationService;

    public ObservationController(ObservationService observationService) {
        this.observationService = observationService;
    }

    @GetMapping("/uf-report")
    public ResponseEntity<UFReportDTO> getUFReport() {
        final UFReportDTO dto = observationService.calculateUFReport();
        return ResponseEntity.ok(dto);
    }
}
