package br.uneb.dcet.si20192.tees.manguebem.api.controller;

import br.uneb.dcet.si20192.tees.manguebem.api.dto.BiomeDTO;
import br.uneb.dcet.si20192.tees.manguebem.api.dto.ObservationDTO;
import br.uneb.dcet.si20192.tees.manguebem.api.dto.SpecieDTO;
import br.uneb.dcet.si20192.tees.manguebem.api.entity.enums.FederativeUnit;
import br.uneb.dcet.si20192.tees.manguebem.api.entity.enums.ObservationType;
import br.uneb.dcet.si20192.tees.manguebem.api.exception.InternalServerErrorException;
import br.uneb.dcet.si20192.tees.manguebem.api.exception.NotFoundException;
import br.uneb.dcet.si20192.tees.manguebem.api.service.BiomeService;
import br.uneb.dcet.si20192.tees.manguebem.api.service.ObservationService;
import br.uneb.dcet.si20192.tees.manguebem.api.service.SpecieService;
import br.uneb.dcet.si20192.tees.manguebem.api.Constants;
import lombok.extern.slf4j.Slf4j;
import org.dhatim.fastexcel.reader.ReadableWorkbook;
import org.dhatim.fastexcel.reader.Row;
import org.dhatim.fastexcel.reader.Sheet;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

@Slf4j
@RestController
@RequestMapping("/v1/species/sheets")
public class SpeciesSheetController {

    private final SpecieService specieService;
    private final ObservationService observationService;
    private final BiomeService biomeService;

    public SpeciesSheetController(SpecieService specieService, ObservationService observationService, BiomeService biomeService) {
        this.specieService = specieService;
        this.observationService = observationService;
        this.biomeService = biomeService;
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Void> createBulk(@RequestPart(value = "file") MultipartFile file) {
        try (ReadableWorkbook wb = new ReadableWorkbook(file.getInputStream())) {
            final Optional<Sheet> speciesSheet = wb.getSheet(Constants.IMPORT_SHEET.SPECIES.SHEET_INDEX);
            if (speciesSheet.isPresent()) {
                final Sheet species = speciesSheet.get();
                try (Stream<Row> rows = species.openStream()) {
                    rows.skip(Constants.IMPORT_SHEET.SPECIES.SHEET_HEADER_ROW_LENGTH).forEach(r -> {
                        final SpecieDTO dto = SpecieDTO
                                .builder()
                                .taxonKingdom(r.getCellText(Constants.IMPORT_SHEET.SPECIES.TAXON_KINGDOM_CELLINDEX))
                                .taxonPhylum(r.getCellText(Constants.IMPORT_SHEET.SPECIES.TAXON_PHYLUM_CELLINDEX))
                                .taxonClass(r.getCellText(Constants.IMPORT_SHEET.SPECIES.TAXON_CLASS_CELLINDEX))
                                .taxonOrder(r.getCellText(Constants.IMPORT_SHEET.SPECIES.TAXON_ORDER_CELLINDEX))
                                .taxonFamily(r.getCellText(Constants.IMPORT_SHEET.SPECIES.TAXON_FAMILY_CELLINDEX))
                                .taxonGenus(r.getCellText(Constants.IMPORT_SHEET.SPECIES.TAXON_GENUS_CELLINDEX))
                                .taxonName(r.getCellText(Constants.IMPORT_SHEET.SPECIES.TAXON_NAME_CELLINDEX))
                                .authors(r.getCellText(Constants.IMPORT_SHEET.SPECIES.AUTHORS_CELLINDEX))
                                .brazilianType(r.getCellText(Constants.IMPORT_SHEET.SPECIES.BRAZILIAN_TYPE_CELLINDEX))
                                .brazilianTypeSynonym(r.getCellText(Constants.IMPORT_SHEET.SPECIES.BRAZILIAN_TYPE_SYNONYM_CELLINDEX))
                                .iNaturalistId(r.getCellText(Constants.IMPORT_SHEET.SPECIES.INATURALISTID_CELLINDEX))
                                .commonName(r.getCellText(Constants.IMPORT_SHEET.SPECIES.COMMON_NAME_CELLINDEX))
                                .bemClassification(r.getCellText(Constants.IMPORT_SHEET.SPECIES.BEM_CLASSIFICATION_CELLINDEX))
                                .build();

                        if (!specieService.exists(dto)) {
                            specieService.createAsync(dto);
                        }
                    });
                }
            }

            final Optional<Sheet> literatureOccurrenceSheet = wb.getSheet(Constants.IMPORT_SHEET.OBSERVATIONS.SHEET_INDEX);
            if (literatureOccurrenceSheet.isPresent()) {
                final Sheet literatureOccurrence = literatureOccurrenceSheet.get();
                try (Stream<Row> rows = literatureOccurrence.openStream()) {
                    rows.skip(Constants.IMPORT_SHEET.OBSERVATIONS.SHEET_HEADER_ROW_LENGTH).forEach(r -> {
                        try {
                            final long specieId = Long.parseLong(r.getCellText(Constants.IMPORT_SHEET.OBSERVATIONS.SPECIE_ID_CELLINDEX));
                            final List<String> federativeUnits = Arrays.asList(r.getCellText(Constants.IMPORT_SHEET.OBSERVATIONS.FEDERATIVE_UNITS_CELLINDEX).split(",\\s*"));
                            final String biomeName = r.getCellText(Constants.IMPORT_SHEET.OBSERVATIONS.BIOME_NAME_CELLINDEX);
                            Long biomeId;
                            if (!biomeName.isBlank()) {
                                final BiomeDTO biome = biomeService.getByName(biomeName);
                                biomeId = biome.getId();
                            } else {
                                biomeId = null;
                            }

                            if (federativeUnits.isEmpty() && biomeId != null) {
                                final ObservationDTO dto = ObservationDTO
                                        .builder()
                                        .specieId(specieId)
                                        .type(ObservationType.LITERATURE)
                                        .biomeId(biomeId)
                                        .build();

                                observationService.createAsync(dto);
                            }

                            federativeUnits.forEach(it -> {
                                if (it.trim().isBlank() && biomeId == null) {
                                    log.info("Skipping row {} because federativeUnit and biome cells are empty", r.getRowNum());
                                } else {
                                    try {
                                        final ObservationDTO dto = ObservationDTO
                                                .builder()
                                                .specieId(specieId)
                                                .type(ObservationType.LITERATURE)
                                                .brazilianFederativeUnit(FederativeUnit.fromCode(it.trim()))
                                                .biomeId(biomeId)
                                                .build();

                                        observationService.createAsync(dto);
                                    } catch (IllegalArgumentException e) {
                                        //do nothing and continue import
                                        log.info("Skipping row {} because of {}:{}", r.getRowNum(), e.getClass().getName(), e.getMessage());
                                    }
                                }
                            });
                        } catch (NotFoundException e) {
                            //do nothing and continue import
                            log.info("Skipping row {} because of {}:{}", r.getRowNum(), e.getClass().getName(), e.getMessage());
                        }
                    });
                }
            }
        } catch (Exception e) {
            throw new InternalServerErrorException();
        }
        return ResponseEntity.ok().build();
    }
}
