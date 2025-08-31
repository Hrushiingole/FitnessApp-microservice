package com.fitness.AIService.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fitness.AIService.model.Activity;
import com.fitness.AIService.model.Recommendation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class ActivityAiService {
    private final GeminiService geminiService;

    public String generateRecommendation(Activity activity){
        String prompt= createPromptForActivity(activity);
        String aiResponse =geminiService.getAnswer(prompt);
        log.info("RESPONSE FROM AI: {}", aiResponse);
        processAiResponse(activity,aiResponse);
        return aiResponse;
    }

    private void processAiResponse(Activity activity,String aiResponse){
        try {
            //to convert the json data into object...
            ObjectMapper mapper=new ObjectMapper();
            JsonNode rootNode =mapper.readTree(aiResponse);

            JsonNode textNode=rootNode.path("candidates").get(0)
                    .path("content")
                    .path("parts")
                    .get(0)
                    .path("text");
            String jsonContent =textNode.asText()
                    .replaceAll("```json\\n","")
                    .replaceAll("\\n```","")
                    .trim();
            log.info("PARSED RESPONSE FROM AI: {}", jsonContent);
        }catch (Exception e){
            e.printStackTrace();
        }
    }

    private String createPromptForActivity(Activity activity) {
        return String.format("""
        Analyze this fitness activity and provide detailed recommendations in the following EXACT JSON format:
        {
          "analysis": {
            "overall": "Overall analysis here",
            "pace": "Pace analysis here",
            "heartRate": "Heart rate analysis here",
            "caloriesBurned": "Calories analysis here"
          },
          "improvements": [
            {
              "area": "Area name",
              "recommendation": "Detailed recommendation"
            }
          ],
          "suggestions": [
            {
              "workout": "Workout name",
              "description": "Detailed workout description"
            }
          ],
          "safety": [
            "Safety point 1",
            "Safety point 2"
          ]
        }

        Analyze this activity:
        Activity Type: %s
        Duration: %d minutes
        Calories Burned: %d
        Additional Metrics: %s
        
        Provide detailed analysis focusing on performance, improvements, next workout suggestions, and safety guidelines.
        Ensure the response follows the EXACT JSON format shown above.
        """,
                activity.getType(),
                activity.getDuration(),
                activity.getCaloriesBurned(),
                activity.getAdditionalMetrics()
        );
    }
}
