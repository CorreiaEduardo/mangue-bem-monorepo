package br.uneb.dcet.si20192.tees.manguebem.api.service;

import br.uneb.dcet.si20192.tees.manguebem.api.repository.SpecieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SpecieService {

    private final SpecieRepository specieRepository;

    @Autowired
    public SpecieService(SpecieRepository specieRepository) {
        this.specieRepository = specieRepository;
    }
}
