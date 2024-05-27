package br.uneb.dcet.si20192.tees.manguebem.api.repository;

import br.uneb.dcet.si20192.tees.manguebem.api.entity.Biome;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BiomeRepository extends JpaRepository<Biome, Long> {
    Optional<Biome> findByNameIgnoreCase(String name);
}
