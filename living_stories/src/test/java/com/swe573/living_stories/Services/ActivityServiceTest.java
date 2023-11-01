package com.swe573.living_stories.Services;

import com.swe573.living_stories.Models.Story;
import com.swe573.living_stories.Models.User;
import com.swe573.living_stories.Models.Activity;
import com.swe573.living_stories.Repositories.ActivityRepository;
import com.swe573.living_stories.Repositories.StoryRepository;
import com.swe573.living_stories.Repositories.UserRepository;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import java.util.Collections;
import java.util.List;

import static java.util.List.*;

@SpringBootTest
class ActivityServiceTest {

    @Mock
    private ActivityRepository activityRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private StoryRepository storyRepository;

    @InjectMocks
    private ActivityService activityService; // Replace with the actual name of your service class

    @Test
    void testRecordLikeActivity() {
        // Prepare test data
        Long storyId = 1L;
        Long userId = 2L;

        // Mock the behavior of the CheckByUserIdAndStoryId method
        Mockito.when(activityRepository.CheckByUserIdAndStoryId(userId, storyId, "Like"))
                .thenReturn(of()); // Assuming no existing entries

        // Mock the behavior of userRepository.getReferenceById and storyRepository.getReferenceById
        User mockUser = new User();
        mockUser.setId(userId);
        mockUser.setName("John Doe");
        mockUser.setPhoto("user_photo_string");

        Story mockStory = new Story();
        mockStory.setId(storyId);
        mockStory.setHeader("Sample Story");

        Mockito.when(userRepository.getReferenceById(userId)).thenReturn(mockUser);
        Mockito.when(storyRepository.getReferenceById(storyId)).thenReturn(mockStory);

        // Call the method to be tested
        activityService.recordLikeActivity(storyId, userId);

        // Verify that activityRepository.save was called with the expected parameters
        Mockito.verify(activityRepository).save(Mockito.any(Activity.class));
    }
}