package com.devEra.ws.service;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ResourceLoader;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.File;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.Map;
import java.util.ArrayList;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.nio.file.Paths;

@Service
public class ToxicityDetectionService {
    
    private static final Logger logger = LoggerFactory.getLogger(ToxicityDetectionService.class);
    
    @Value("${python.script.path:scripts/toxic_detector.py}")
    private String pythonScriptPath;

    @Value("${python.executable:python3}")
    private String pythonExecutable;
    
    @Value("${user.dir:#{null}}")
    private String projectRoot;

    private final ResourceLoader resourceLoader;
    private final ObjectMapper objectMapper;

    public ToxicityDetectionService(ResourceLoader resourceLoader, ObjectMapper objectMapper) {
        this.resourceLoader = resourceLoader;
        this.objectMapper = objectMapper;
    }

    public Map<String, Object> checkToxicity(String text) {
        if (text == null || text.trim().isEmpty()) {
            return Map.of(
                "toxic_score", 0.0,
                "is_toxic", false,
                "text", ""
            );
        }

        try {
            // Get the absolute path of the script
            String scriptPath;
            if (projectRoot != null) {
                // Use project root path
                scriptPath = Paths.get(projectRoot, pythonScriptPath).toString();
            } else {
                // Fallback to working directory
                scriptPath = Paths.get(System.getProperty("user.dir"), pythonScriptPath).toString();
            }
            
            File scriptFile = new File(scriptPath);
            if (!scriptFile.exists()) {
                throw new RuntimeException("Python script not found at: " + scriptPath);
            }
            
            logger.info("Using Python script at: {}", scriptPath);
            
            // Build command
            List<String> command = new ArrayList<>();
            command.add(pythonExecutable);
            command.add(scriptPath);
            command.add(text);
            
            logger.info("Executing toxicity detection command: {}", String.join(" ", command));
            
            ProcessBuilder processBuilder = new ProcessBuilder(command);
            processBuilder.redirectErrorStream(true);
            
            Process process = processBuilder.start();
            
            // Read output
            StringBuilder output = new StringBuilder();
            try (BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()))) {
                String line;
                while ((line = reader.readLine()) != null) {
                    output.append(line);
                    logger.debug("Python output line: {}", line);
                }
            }
            
            int exitCode = process.waitFor();
            logger.info("Python process exit code: {}", exitCode);
            
            if (exitCode == 0) {
                String jsonOutput = output.toString().trim();
                if (jsonOutput.isEmpty()) {
                     throw new RuntimeException("Empty output from Python script");
                }
                
                try {
                    return objectMapper.readValue(jsonOutput, Map.class);
                } catch (Exception e) {
                    logger.error("Error parsing JSON output: '{}'. Error: {}", jsonOutput, e.getMessage());
                    throw new RuntimeException("Error parsing toxicity detection output: " + e.getMessage());
                }
            } else {
                throw new RuntimeException("Toxicity detection script failed with exit code: " + exitCode);
            }
            
        } catch (Exception e) {
            logger.error("Error in toxicity check: ", e);
            // Fallback response in case of error
            return Map.of(
                "toxic_score", 0.0,
                "is_toxic", false,
                "text", text,
                "error", e.getMessage()
            );
        }
    }
} 