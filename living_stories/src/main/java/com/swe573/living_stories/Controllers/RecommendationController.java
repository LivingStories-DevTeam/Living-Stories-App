package com.swe573.living_stories.Controllers;

import com.swe573.living_stories.Services.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.List;
import java.util.Objects;


@RestController
@RequestMapping("/recommend")
public class RecommendationController {

    final private String PYTHON_FLASK_URL = "http://localhost:5000";

    //final private String PYTHON_FLASK_URL = "http://flask-app:5000";


    final private UserService userService;

    public RecommendationController (UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<List<Long>> getRecommendations(HttpServletRequest request){

        //Long userId = userService.isUserLoggedIn(request);
        long userId = 1;
        String pythonEndpointUrl = PYTHON_FLASK_URL + "/recommend?user_id=" + userId;

        RestTemplate restTemplate = new RestTemplate();

        Long[] recommendationsArray = restTemplate.getForObject(pythonEndpointUrl, Long[].class);

        if (Objects.nonNull(recommendationsArray) && recommendationsArray.length != 0) {
            List<Long> recommendations = Arrays.asList(recommendationsArray);
            return ResponseEntity.ok(recommendations);
        }
        return null;
    }
}
