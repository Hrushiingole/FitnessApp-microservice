package com.fitness.ActivityService.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientException;
import org.springframework.web.reactive.function.client.WebClientResponseException;

@Service
@RequiredArgsConstructor
public class UserValidationService {

    @Autowired
    private final WebClient userServiceWebClient;

    public boolean validateUser(String UserId) {
        try {
            return userServiceWebClient.get().uri("/api/users/{UserId}/validate", UserId)
                    .retrieve()
                    .bodyToMono(Boolean.class)
                    .block();

        } catch (WebClientResponseException e) {
                if(e.getStatusCode()== HttpStatus.NOT_FOUND){
                    throw new RuntimeException("user not found: "+UserId);
                } else if (e.getStatusCode() == HttpStatus.BAD_REQUEST) {
                    throw new RuntimeException("Invalid Request: "+UserId);
                }
        }
        return false;
    }
}
