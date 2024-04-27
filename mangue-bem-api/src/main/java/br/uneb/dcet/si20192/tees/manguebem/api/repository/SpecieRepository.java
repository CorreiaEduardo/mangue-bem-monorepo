package br.uneb.dcet.si20192.tees.manguebem.api.repository;

import br.uneb.dcet.si20192.tees.manguebem.api.entity.Specie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SpecieRepository extends JpaRepository<Specie, Long> {
}
