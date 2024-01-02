package com.swe573.living_stories.Services;

import com.swe573.living_stories.Configuration.DateParser;
import com.swe573.living_stories.DTO.MediaDTO;
import com.swe573.living_stories.DTO.StoryDTO;
import com.swe573.living_stories.Models.Locations;
import com.swe573.living_stories.Models.Story;
import com.swe573.living_stories.Models.User;
import com.swe573.living_stories.Repositories.StoryRepository;
import com.swe573.living_stories.Repositories.UserRepository;
import com.swe573.living_stories.Requests.StoryRequest;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class StoryServiceTest {

    @Mock
    private StoryRepository storyRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private StoryService storyService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void createStory_ShouldReturnCreatedStory() {
        // Arrange
        Story story = new Story();
        when(storyRepository.save(story)).thenReturn(story);

        // Act
        Story result = storyService.createStory(story);

        // Assert
        assertNotNull(result);
        assertEquals(story, result);
        verify(storyRepository, times(1)).save(story);
    }

    @Test
    void updateStory_WhenStoryExists_ShouldReturnUpdatedStory() {
        // Arrange
        Long storyId = 1L;
        StoryRequest secondStory = new StoryRequest();
        Story oldStory = new Story();
        oldStory.setId(storyId);
        when(storyRepository.findById(storyId)).thenReturn(Optional.of(oldStory));
        when(storyRepository.save(oldStory)).thenReturn(oldStory);

        // Act
        Story result = storyService.updateStory(storyId, secondStory);

        // Assert
        assertNotNull(result);
        assertEquals(oldStory, result);
        verify(storyRepository, times(1)).findById(storyId);
        verify(storyRepository, times(1)).save(oldStory);
    }

    @Test
    void updateStory_WhenStoryDoesNotExist_ShouldThrowEntityNotFoundException() {
        // Arrange
        Long storyId = 1L;
        StoryRequest secondStory = new StoryRequest();
        when(storyRepository.findById(storyId)).thenReturn(Optional.empty());

        // Assert
        assertThrows(EntityNotFoundException.class, () -> storyService.updateStory(storyId, secondStory));
        verify(storyRepository, times(1)).findById(storyId);
        verify(storyRepository, never()).save(any(Story.class));
    }

    @Test
    void getAllStories_ShouldReturnListOfStoryDTOs() {
        // Arrange
        List<Story> stories = Arrays.asList(new Story(), new Story());
        when(storyRepository.findAllOrdered()).thenReturn(stories);

        // Act
        List<StoryDTO> result = storyService.getAllStories();

        // Assert
        assertNotNull(result);
        assertEquals(stories.size(), result.size());
        verify(storyRepository, times(1)).findAllOrdered();
    }

    @Test
    void getStoryById_WhenStoryExists_ShouldReturnStory() {
        // Arrange
        Long storyId = 1L;
        Story story = new Story();
        when(storyRepository.findById(storyId)).thenReturn(Optional.of(story));

        // Act
        Story result = storyService.getStoryById(storyId);

        // Assert
        assertNotNull(result);
        assertEquals(story, result);
        verify(storyRepository, times(1)).findById(storyId);
    }

    @Test
    void getStoryById_WhenStoryDoesNotExist_ShouldReturnNull() {
        // Arrange
        Long storyId = 1L;
        when(storyRepository.findById(storyId)).thenReturn(Optional.empty());

        // Act
        Story result = storyService.getStoryById(storyId);

        // Assert
        assertNull(result);
        verify(storyRepository, times(1)).findById(storyId);
    }

    @Test
    void getByUserId_ShouldReturnListOfStories() {
        // Arrange
        Long userId = 1L;
        List<Story> stories = Arrays.asList(new Story(), new Story());
        when(storyRepository.findByUserId(userId)).thenReturn(stories);

        // Act
        List<Story> result = storyService.getByUserId(userId);

        // Assert
        assertNotNull(result);
        assertEquals(stories.size(), result.size());
        verify(storyRepository, times(1)).findByUserId(userId);
    }

    @Test
    void deleteStoryById_WhenStoryExists_ShouldDeleteStory() {
        // Arrange
        Long storyId = 1L;
        Story story = new Story();
        when(storyRepository.findById(storyId)).thenReturn(Optional.of(story));

        // Act
        storyService.deleteStoryById(storyId);

        // Assert
        verify(storyRepository, times(1)).findById(storyId);
        verify(storyRepository, times(1)).deleteById(storyId);
    }

    @Test
    void deleteStoryById_WhenStoryDoesNotExist_ShouldDoNothing() {
        // Arrange
        Long storyId = 1L;
        when(storyRepository.findById(storyId)).thenReturn(Optional.empty());

        // Act
        storyService.deleteStoryById(storyId);

        // Assert
        verify(storyRepository, times(1)).findById(storyId);
        verify(storyRepository, never()).deleteById(storyId);
    }

    @Test
    void getFollowingStories_WhenUserExists_ShouldReturnListOfStories() {
        // Arrange
        Long userId = 1L;
        User user = new User();
        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        List<Story> stories = Arrays.asList(new Story(), new Story());
        when(storyRepository.findByUserIdIn(anyList())).thenReturn(stories);

        // Act
        List<Story> result = storyService.getFollowingStories(userId);

        // Assert
        assertNotNull(result);
        assertEquals(stories.size(), result.size());
        verify(userRepository, times(1)).findById(userId);
        verify(storyRepository, times(1)).findByUserIdIn(anyList());
    }

    @Test
    void getFollowingStories_WhenUserDoesNotExist_ShouldReturnEmptyList() {
        // Arrange
        Long userId = 1L;
        when(userRepository.findById(userId)).thenReturn(Optional.empty());

        // Act
        List<Story> result = storyService.getFollowingStories(userId);

        // Assert
        assertNotNull(result);
        assertTrue(result.isEmpty());
        verify(userRepository, times(1)).findById(userId);
        verify(storyRepository, never()).findByUserIdIn(anyList());
    }

    @Test
    void likeStory_WhenUserAndStoryExist_ShouldLikeStory() {
        // Arrange
        Long storyId = 1L;
        Long userId = 2L;
        User user = new User();
        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        Story story = new Story();
        when(storyRepository.findById(storyId)).thenReturn(Optional.of(story));

        // Act
        String result = storyService.likeStory(storyId, userId);

        // Assert
        assertNotNull(result);
        assertEquals("User liked story!", result);
        assertTrue(story.getLikes().contains(userId));
        verify(userRepository, times(1)).findById(userId);
        verify(storyRepository, times(1)).findById(storyId);
        verify(storyRepository, times(1)).save(story);
    }

    @Test
    void likeStory_WhenUserUnlikesStory_ShouldUnlikeStory() {
        // Arrange
        Long storyId = 1L;
        Long userId = 2L;
        User user = new User();
        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        Story story = new Story();
        story.getLikes().add(userId);
        when(storyRepository.findById(storyId)).thenReturn(Optional.of(story));

        // Act
        String result = storyService.likeStory(storyId, userId);

        // Assert
        assertNotNull(result);
        assertEquals("User unliked story", result);
        assertFalse(story.getLikes().contains(userId));
        verify(userRepository, times(1)).findById(userId);
        verify(storyRepository, times(1)).findById(storyId);
        verify(storyRepository, times(1)).save(story);
    }

    @Test
    void likeStory_WhenUserOrStoryDoesNotExist_ShouldReturnErrorMessage() {
        // Arrange
        Long storyId = 1L;
        Long userId = 2L;
        when(userRepository.findById(userId)).thenReturn(Optional.empty());
        when(storyRepository.findById(storyId)).thenReturn(Optional.empty());

        // Act
        String result = storyService.likeStory(storyId, userId);

        // Assert
        assertNotNull(result);
        assertEquals("User or comment can not be found!", result);
        verify(userRepository, times(1)).findById(userId);
        verify(storyRepository, times(1)).findById(storyId);
        verify(storyRepository, never()).save(any(Story.class));
    }

    @Test
    void addLocation_WhenStoryExists_ShouldAddLocation() {
        // Arrange
        Long storyId = 1L;
        List<Locations> locationsList = Arrays.asList(new Locations(), new Locations());
        Story story = new Story();
        when(storyRepository.findById(storyId)).thenReturn(Optional.of(story));

        // Act
        boolean result = storyService.addLocation(storyId, locationsList);

        // Assert
        assertTrue(result);
        assertEquals(locationsList, story.getLocations());
        verify(storyRepository, times(1)).findById(storyId);
        verify(storyRepository, times(1)).save(story);
    }

    @Test
    void addLocation_WhenStoryDoesNotExist_ShouldReturnFalse() {
        // Arrange
        Long storyId = 1L;
        List<Locations> locationsList = Arrays.asList(new Locations(), new Locations());
        when(storyRepository.findById(storyId)).thenReturn(Optional.empty());

        // Act
        boolean result = storyService.addLocation(storyId, locationsList);

        // Assert
        assertFalse(result);
        verify(storyRepository, times(1)).findById(storyId);
        verify(storyRepository, never()).save(any(Story.class));
    }

    @Test
    void addLocationAdvanced_WhenStoryExists_ShouldAddLocationAdvanced() {
        // Arrange
        Long storyId = 1L;
        List<Locations> locationsList = Arrays.asList(new Locations(), new Locations());
        Story story = new Story();
        when(storyRepository.findById(storyId)).thenReturn(Optional.of(story));

        // Act
        boolean result = storyService.addLocationAdvanced(storyId, locationsList);

        // Assert
        assertTrue(result);
        assertEquals(locationsList, story.getLocationsAdvanced());
        verify(storyRepository, times(1)).findById(storyId);
        verify(storyRepository, times(1)).save(story);
    }

    @Test
    void addLocationAdvanced_WhenStoryDoesNotExist_ShouldReturnFalse() {
        // Arrange
        Long storyId = 1L;
        List<Locations> locationsList = Arrays.asList(new Locations(), new Locations());
        when(storyRepository.findById(storyId)).thenReturn(Optional.empty());

        // Act
        boolean result = storyService.addLocationAdvanced(storyId, locationsList);

        // Assert
        assertFalse(result);
        verify(storyRepository, times(1)).findById(storyId);
        verify(storyRepository, never()).save(any(Story.class));
    }

    @Test
    void testAddMedia() {
        // Arrange
        Long storyId = 1L;
        ArrayList<MediaDTO> mediaDTOList = new ArrayList<>();
        MediaDTO mediaDTO = new MediaDTO("image", "base64imagestring".getBytes());
        mediaDTOList.add(mediaDTO);

        Story story = new Story();
        when(storyRepository.findById(storyId)).thenReturn(java.util.Optional.of(story));

        // Act
        boolean result = storyService.addMedia(storyId, mediaDTOList);

        // Assert
        assertFalse(result);
        assertEquals(1, story.getMedia().size());
        verify(storyRepository, times(1)).save(story);
    }

    @Test
    void testAddMedia_InvalidStoryId() {
        // Arrange
        Long storyId = 1L;
        ArrayList<MediaDTO> mediaDTOList = new ArrayList<>();
        MediaDTO mediaDTO = new MediaDTO("image", "base64imagestring".getBytes());
        mediaDTOList.add(mediaDTO);

        when(storyRepository.findById(storyId)).thenReturn(java.util.Optional.empty());

        // Act
        boolean result = storyService.addMedia(storyId, mediaDTOList);

        // Assert
        assertFalse(result);
        verify(storyRepository, times(0)).save(any());
    }

    @Test
    void testAddStartDate_InvalidStoryId() {
        // Arrange
        Long storyId = 1L;
        String startDate = "2022-01-01";

        when(storyRepository.findById(storyId)).thenReturn(java.util.Optional.empty());

        // Act
        storyService.addStartDate(storyId, startDate);

        // Assert
        verify(storyRepository, times(0)).save(any());
    }

    @Test
    void testAddSeason_StartSeason() {
        // Arrange
        Long storyId = 1L;
        String season = "Spring";
        int flag = 0;
        Story story = new Story();

        when(storyRepository.findById(storyId)).thenReturn(java.util.Optional.of(story));

        // Act
        storyService.addSeason(storyId, season, flag);

        // Assert
        assertEquals(season, story.getStartSeason());
        verify(storyRepository, times(1)).save(story);
    }

    @Test
    void testAddSeason_EndSeason() {
        // Arrange
        Long storyId = 1L;
        String season = "Winter";
        int flag = 1;
        Story story = new Story();

        when(storyRepository.findById(storyId)).thenReturn(java.util.Optional.of(story));

        // Act
        storyService.addSeason(storyId, season, flag);

        // Assert
        assertEquals(season, story.getEndSeason());
        verify(storyRepository, times(1)).save(story);
    }

    @Test
    void testAddSeason_InvalidStoryId() {
        // Arrange
        Long storyId = 1L;
        String season = "Spring";
        int flag = 0;

        when(storyRepository.findById(storyId)).thenReturn(java.util.Optional.empty());

        // Act
        storyService.addSeason(storyId, season, flag);

        // Assert
        verify(storyRepository, times(0)).save(any());
    }
}
