package br.uneb.dcet.si20192.tees.manguebemapi.service;

import br.uneb.dcet.si20192.tees.manguebemapi.repository.SpecieRepository;
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
