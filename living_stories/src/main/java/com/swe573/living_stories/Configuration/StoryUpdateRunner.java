package com.swe573.living_stories.Configuration;

import com.swe573.living_stories.Models.Locations;
import com.swe573.living_stories.Models.Story;
import com.swe573.living_stories.Repositories.StoryRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.ArrayList;
import java.util.List;

@Configuration
public class StoryUpdateRunner {

    @Bean
    public CommandLineRunner updateStoryLocations(StoryRepository storyRepository) {
        return args -> {
            List<Story> stories = storyRepository.findAll();

            for (Story story : stories) {
                boolean updated = false;
                for (Locations location : story.getLocations()) {
                    if (location.getCoordinates() == null || location.getCoordinates().isEmpty()) {
                        List<List<Double>> newCoordinates = new ArrayList<>();
                        List<Double> defaultCoordinates = new ArrayList<>();
                        defaultCoordinates.add(location.getLng());
                        defaultCoordinates.add(location.getLat());
                        newCoordinates.add(defaultCoordinates);

                        location.setCoordinates(newCoordinates);
                        updated = true;
                    }
                }
                if (updated) {
                    storyRepository.save(story);
                }
            }
        };
    }
}
