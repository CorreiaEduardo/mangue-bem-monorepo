package br.uneb.dcet.si20192.tees.manguebemapi.entity;

import br.uneb.dcet.si20192.tees.manguebemapi.entity.basic.CuratedEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "observations")
public class Observation extends CuratedEntity {

    @ManyToOne
    @JoinColumn(name = "specie_id")
    private Specie specie;

    @Column(name = "city_ibge_id", nullable = false)
    private String cityIBGEId;

    @Column(name = "state_ibge_id", nullable = false)
    private String stateIBGEId;
}
