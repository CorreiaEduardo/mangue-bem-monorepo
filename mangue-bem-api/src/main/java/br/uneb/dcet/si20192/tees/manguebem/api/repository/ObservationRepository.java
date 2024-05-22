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
            "GROUP BY o.brazilianFederativeUnit")
    List<UFReportItemDTO> countSpeciesByFederativeUnit();

    @Query("SELECT new br.uneb.dcet.si20192.tees.manguebem.api.dto.UFReportItemDTO(o.brazilianFederativeUnit, COUNT(DISTINCT o.specie.id)) " +
            "FROM Observation o " +
            "WHERE o.specie.id = :specieId " +
            "GROUP BY o.brazilianFederativeUnit")
    List<UFReportItemDTO> countSpeciesByFederativeUnitAndSpecie(@Param("specieId") String specieId);
}
