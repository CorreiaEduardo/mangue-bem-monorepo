package br.uneb.dcet.si20192.tees.manguebem.api.repository;

import br.uneb.dcet.si20192.tees.manguebem.api.entity.Specie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface SpecieRepository extends JpaRepository<Specie, Long> {

    @Query("SELECT CASE WHEN COUNT(s) > 0 THEN true ELSE false END FROM Specie s " +
            "WHERE s.taxonKingdom = :taxonKingdom " +
            "AND s.taxonPhylum = :taxonPhylum " +
            "AND s.taxonClass = :taxonClass " +
            "AND s.taxonOrder = :taxonOrder " +
            "AND s.taxonFamily = :taxonFamily " +
            "AND s.taxonGenus = :taxonGenus " +
            "AND s.taxonName = :taxonName")
    boolean existsByTaxon(@Param("taxonKingdom") String taxonKingdom,
                          @Param("taxonPhylum") String taxonPhylum,
                          @Param("taxonClass") String taxonClass,
                          @Param("taxonOrder") String taxonOrder,
                          @Param("taxonFamily") String taxonFamily,
                          @Param("taxonGenus") String taxonGenus,
                          @Param("taxonName") String taxonName);
}
