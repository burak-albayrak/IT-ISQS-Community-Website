package com.devEra.ws.service;

import org.springframework.stereotype.Service;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.File;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.Map;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Value;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class ToxicityDetectionService {
    
    private static final Logger logger = LoggerFactory.getLogger(ToxicityDetectionService.class);
    
    @Value("${python.script.path:scripts/toxic_detector.py}")
    private String pythonScriptPath;

    public Map<String, Object> checkToxicity(String text) {
        try {
            List<String> command = new ArrayList<>();
            command.add("python3");
            command.add(new File(pythonScriptPath).getAbsolutePath());
            command.add(text);
            
            logger.info("Executing command: {}", String.join(" ", command));
            
            ProcessBuilder processBuilder = new ProcessBuilder(command);
            processBuilder.redirectErrorStream(true); // Redirect stderr to stdout
            
            Process process = processBuilder.start();
            
            List<String> outputLines = new ArrayList<>();
            String lastNonEmptyLine = null;
            try (BufferedReader reader = new BufferedReader(
                    new InputStreamReader(process.getInputStream()))) {
                String line;
                while ((line = reader.readLine()) != null) {
                    outputLines.add(line);
                    if (!line.trim().isEmpty()) {
                        lastNonEmptyLine = line.trim();
                    }
                    logger.debug("Python output line: {}", line);
                }
            }
            
            int exitCode = process.waitFor();
            logger.info("Python process exit code: {}", exitCode);
            logger.info("Full Python output:\n{}", String.join("\n", outputLines));
            logger.info("Last non-empty line (assumed JSON): {}", lastNonEmptyLine);
            
            if (exitCode == 0) {
                if (lastNonEmptyLine == null) {
                     throw new RuntimeException("Empty output from Python script");
                }
                try {
                    ObjectMapper mapper = new ObjectMapper();
                    return mapper.readValue(lastNonEmptyLine, Map.class);
                } catch (Exception e) {
                    logger.error("Error parsing JSON from last line: '{}'. Error: {}", lastNonEmptyLine, e.getMessage());
                    throw new RuntimeException("Error parsing Python script output: " + e.getMessage());
                }
            } else {
                throw new RuntimeException("Python script execution failed with exit code: " + exitCode + ". Full output: " + String.join("\n", outputLines));
            }
            
        } catch (Exception e) {
            logger.error("Error in toxicity check: ", e);
            throw new RuntimeException("Error checking toxicity: " + e.getMessage());
        }
    }
} 