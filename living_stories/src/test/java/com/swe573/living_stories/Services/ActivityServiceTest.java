package com.swe573.living_stories.Services;
import com.swe573.living_stories.Models.Activity;
import com.swe573.living_stories.Models.Story;
import com.swe573.living_stories.Models.User;
import com.swe573.living_stories.Repositories.ActivityRepository;
import com.swe573.living_stories.Repositories.StoryRepository;
import com.swe573.living_stories.Repositories.UserRepository;
import com.swe573.living_stories.Services.ActivityService;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import java.util.Collections;
import java.util.Date;

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
    void testRecordActivity() {
        // Prepare test data
        Long storyId = 1L;
        Long userId = 2L;
        String actionType = "Action";

        // Mock the behavior of the CheckByUserIdAndStoryId method
        Mockito.when(activityRepository.CheckByUserIdAndStoryId(userId, storyId, actionType))
                .thenReturn(Collections.emptyList()); // Assuming no existing entries

        // Mock the behavior of userRepository.getReferenceById and storyRepository.getReferenceById
        User mockUser = new User();
        mockUser.setId(userId);
        mockUser.setName("John Doe");
        mockUser.setPhoto("user_photo_url");

        Story mockStory = new Story();
        mockStory.setId(storyId);
        mockStory.setHeader("Sample Story");

        Mockito.when(userRepository.getReferenceById(userId)).thenReturn(mockUser);
        Mockito.when(storyRepository.getReferenceById(storyId)).thenReturn(mockStory);

        // Call the method to be tested
        activityService.recordActivity(storyId, userId, actionType);

        // Verify that activityRepository.save was called with the expected parameters
        Mockito.verify(activityRepository).save(Mockito.any(Activity.class));
    }

    @Test
    void testRecordFollowAction() {
        // Prepare test data
        Long userId = 1L;
        Long followingId = 2L;

        // Mock the behavior of the CheckByUserIdAndFollowingId method
        Mockito.when(activityRepository.CheckByUserIdAndFollowingId(userId, followingId))
                .thenReturn(Collections.emptyList()); // Assuming no existing entries

        // Mock the behavior of userRepository.getReferenceById
        User mockUser = new User();
        mockUser.setId(userId);
        mockUser.setName("John Doe");
        mockUser.setPhoto("user_photo_url");

        User mockFollowingUser = new User();
        mockFollowingUser.setId(followingId);
        mockFollowingUser.setName("Jane Doe");

        Mockito.when(userRepository.getReferenceById(userId)).thenReturn(mockUser);
        Mockito.when(userRepository.getReferenceById(followingId)).thenReturn(mockFollowingUser);

        // Call the method to be tested
        activityService.recordFollowAction(userId, followingId);

        // Verify that activityRepository.save was called with the expected parameters
        Mockito.verify(activityRepository).save(Mockito.any(Activity.class));
    }

}
