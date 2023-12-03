package com.swe573.living_stories.Requests;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;

@Getter
@Setter
public class RecommendationRequest {
    private ArrayList<Long> storyIds;
}