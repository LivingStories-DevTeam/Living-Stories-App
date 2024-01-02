package com.swe573.living_stories.Services;

import com.swe573.living_stories.Models.RecommendUser;
import com.swe573.living_stories.Repositories.RecommendUserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class RecommendUserServiceTest {

    @Mock
    private RecommendUserRepository recommendUserRepository;

    @InjectMocks
    private RecommendUserService recommendUserService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void getUserById_WhenUserExists_ShouldReturnUser() {
        // Arrange
        Long userId = 1L;
        RecommendUser recommendUser = new RecommendUser();
        when(recommendUserRepository.findByUserId(userId)).thenReturn(Optional.of(recommendUser));

        // Act
        RecommendUser result = recommendUserService.getUserById(userId);

        // Assert
        assertNotNull(result);
        assertEquals(recommendUser, result);
        verify(recommendUserRepository, times(1)).findByUserId(userId);
    }

    @Test
    void getUserById_WhenUserDoesNotExist_ShouldReturnNull() {
        // Arrange
        Long userId = 1L;
        when(recommendUserRepository.findByUserId(userId)).thenReturn(Optional.empty());

        // Act
        RecommendUser result = recommendUserService.getUserById(userId);

        // Assert
        assertNull(result);
        verify(recommendUserRepository, times(1)).findByUserId(userId);
    }

    @Test
    void saveAction_WhenUserExistsAndActionTypeIsRead_ShouldSaveReadAction() {
        // Arrange
        Long userId = 1L;
        Long storyId = 2L;
        String actionType = "R";
        RecommendUser recommendUser = new RecommendUser();
        recommendUser.setUserId(userId);
        when(recommendUserRepository.findByUserId(userId)).thenReturn(Optional.of(recommendUser));
        when(recommendUserRepository.save(recommendUser)).thenReturn(recommendUser);

        // Act
        recommendUserService.saveAction(userId, storyId, actionType);

        // Assert
        assertNotNull(recommendUser.getReadStoryId());
        assertTrue(recommendUser.getReadStoryId().contains(storyId));
        verify(recommendUserRepository, times(1)).findByUserId(userId);
        verify(recommendUserRepository, times(1)).save(recommendUser);
    }

    @Test
    void saveAction_WhenUserExistsAndActionTypeIsLike_ShouldSaveLikeAction() {
        // Arrange
        Long userId = 1L;
        Long storyId = 2L;
        String actionType = "L";
        RecommendUser recommendUser = new RecommendUser();
        recommendUser.setUserId(userId);
        when(recommendUserRepository.findByUserId(userId)).thenReturn(Optional.of(recommendUser));
        when(recommendUserRepository.save(recommendUser)).thenReturn(recommendUser);

        // Act
        recommendUserService.saveAction(userId, storyId, actionType);

        // Assert
        assertNotNull(recommendUser.getLikedStoryId());
        assertTrue(recommendUser.getLikedStoryId().contains(storyId));
        verify(recommendUserRepository, times(1)).findByUserId(userId);
        verify(recommendUserRepository, times(1)).save(recommendUser);
    }

    @Test
    void saveAction_WhenUserDoesNotExistAndActionTypeIsRead_ShouldSaveReadAction() {
        // Arrange
        Long userId = 1L;
        Long storyId = 2L;
        String actionType = "R";
        when(recommendUserRepository.findByUserId(userId)).thenReturn(Optional.empty());
        when(recommendUserRepository.save(any(RecommendUser.class))).thenAnswer(invocation -> invocation.getArgument(0));

        // Act
        recommendUserService.saveAction(userId, storyId, actionType);

        // Assert
        verify(recommendUserRepository, times(1)).findByUserId(userId);
        verify(recommendUserRepository, times(1)).save(any(RecommendUser.class));
    }

    @Test
    void saveAction_WhenUserDoesNotExistAndActionTypeIsLike_ShouldSaveLikeAction() {
        // Arrange
        Long userId = 1L;
        Long storyId = 2L;
        String actionType = "L";
        when(recommendUserRepository.findByUserId(userId)).thenReturn(Optional.empty());
        when(recommendUserRepository.save(any(RecommendUser.class))).thenAnswer(invocation -> invocation.getArgument(0));

        // Act
        recommendUserService.saveAction(userId, storyId, actionType);

        // Assert
        verify(recommendUserRepository, times(1)).findByUserId(userId);
        verify(recommendUserRepository, times(1)).save(any(RecommendUser.class));
    }
}

