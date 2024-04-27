package br.uneb.dcet.si20192.tees.manguebem.api.service;

import br.uneb.dcet.si20192.tees.manguebem.api.repository.ObservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ObservationService {

    private final ObservationRepository observationRepository;

    @Autowired
    public ObservationService(ObservationRepository observationRepository) {
        this.observationRepository = observationRepository;
    }
}
