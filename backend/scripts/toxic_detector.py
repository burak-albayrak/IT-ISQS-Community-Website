#!/usr/bin/env python3
from transformers import pipeline
import json
import sys

def check_toxicity(text):
    try:
        # Toxic comment classifier
        classifier = pipeline("text-classification", model="unitary/toxic-bert")
        result = classifier(text)
        
        # Result contains probability in the score field
        toxicity_score = float(result[0]['score'] * 100)  # Convert to percentage and ensure it's float
        
        response = {
            "toxic_score": toxicity_score,
            "is_toxic": toxicity_score > 30,
            "text": text
        }
        
        return response
        
    except Exception as e:
        return {
            "error": str(e)
        }

if __name__ == "__main__":
    try:
        if len(sys.argv) < 2:
            result = {"error": "No text provided"}
        else:
            text = sys.argv[1]
            result = check_toxicity(text)
        
        # Ensure proper JSON output
        json_output = json.dumps(result, ensure_ascii=False)
        sys.stdout.write(json_output)
        sys.stdout.flush()
        sys.exit(0)
        
    except Exception as e:
        error_result = {"error": str(e)}
        sys.stdout.write(json.dumps(error_result, ensure_ascii=False))
        sys.stdout.flush()
        sys.exit(1) 