package com.eis.carboncredits.models;

import com.fasterxml.jackson.core.type.TypeReference;
import com.eis.carboncredits.repositories.EvaluationRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import java.io.IOException;
import java.io.InputStream;

@Component
public class EvaluationJsonDataLoader implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(EvaluationJsonDataLoader.class);
    final EvaluationRepository evaluationRepository;
    private final ObjectMapper objectMapper;

    public EvaluationJsonDataLoader(EvaluationRepository evaluationRepository, ObjectMapper objectMapper) {
        this.evaluationRepository = evaluationRepository;
        this.objectMapper = objectMapper;
    }

    @Override
    public void run(String... args) throws Exception {
        if(evaluationRepository.count() == 0) {
            try (InputStream inputStream = TypeReference.class.getResourceAsStream("/data/evaluations.json")) {
                Evaluations allEval = objectMapper.readValue(inputStream, Evaluations.class);
                log.info("Reading {} evaluations from JSON data and saving to in-memory collection.", allEval.evaluations().size());
                evaluationRepository.saveAll(allEval.evaluations());
            } catch (IOException e) {
                throw new RuntimeException("Failed to read JSON data", e);
            }
        } else {
            log.info("Not loading Runs from JSON data because the collection contains data.");
        }
    }

}
