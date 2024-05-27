package br.uneb.dcet.si20192.tees.manguebem.integration.iucnredlist.response;

import br.uneb.dcet.si20192.tees.manguebem.integration.iucnredlist.dto.IUCNSpecieSearchResult;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class IUCNSpecieResponse {
    private String name;
    private List<IUCNSpecieSearchResult> result;
}
