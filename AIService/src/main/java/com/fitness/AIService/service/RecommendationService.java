package com.fitness.AIService.service;

import com.fitness.AIService.model.Recommendation;
import com.fitness.AIService.respository.RecommendationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RecommendationService {

    private final RecommendationRepository recommendationRepository;

    public List<Recommendation> getUserRecommendation(String userId) {
        return recommendationRepository.findByUserId(userId);
    }

    public Recommendation getActivityRecommendation(String activityId) {
        return  recommendationRepository.findByActivityId(activityId)
                .orElseThrow(()-> new RuntimeException("No recommendation found for this activity: "+activityId));

    }
}
