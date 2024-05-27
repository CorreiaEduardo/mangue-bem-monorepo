package br.uneb.dcet.si20192.tees.manguebem.api.repository;

import br.uneb.dcet.si20192.tees.manguebem.api.dto.UFReportItemDTO;
import br.uneb.dcet.si20192.tees.manguebem.api.entity.Observation;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.support.JpaRepositoryImplementation;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ObservationRepository extends JpaRepositoryImplementation<Observation, Long> {
    @Query("SELECT new br.uneb.dcet.si20192.tees.manguebem.api.dto.UFReportItemDTO(o.brazilianFederativeUnit, COUNT(DISTINCT o.specie.id)) " +
            "FROM Observation o " +
            "WHERE (:specieId IS NULL OR o.specie.id = :specieId) " +
            "AND (:bemClassification IS NULL OR o.specie.bemClassification = :bemClassification) " +
            "GROUP BY o.brazilianFederativeUnit")
    List<UFReportItemDTO> countSpeciesByFederativeUnit(@Param("specieId") String specieId, @Param("bemClassification") String bemClassification);
}
