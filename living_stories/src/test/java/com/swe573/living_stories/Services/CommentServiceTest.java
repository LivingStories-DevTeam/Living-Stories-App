package com.swe573.living_stories.Services;

import com.swe573.living_stories.Models.Comment;
import com.swe573.living_stories.Models.Story;
import com.swe573.living_stories.Models.User;
import com.swe573.living_stories.Repositories.CommentRepository;
import com.swe573.living_stories.Repositories.StoryRepository;
import com.swe573.living_stories.Repositories.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class CommentServiceTest {

    @Mock
    private CommentRepository commentRepository;

    @Mock
    private StoryRepository storyRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private CommentService commentService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void addCommentToStory_WhenStoryExists_ShouldSaveComment() {
        // Arrange
        Long storyId = 1L;
        Comment comment = new Comment();
        Story story = new Story();
        when(storyRepository.findById(storyId)).thenReturn(Optional.of(story));
        when(commentRepository.save(comment)).thenReturn(comment);

        // Act
        Comment result = commentService.addCommentToStory(storyId, comment);

        // Assert
        assertNotNull(result);
        assertEquals(comment, result);
        assertEquals(story, comment.getStory());
        verify(storyRepository, times(1)).findById(storyId);
        verify(commentRepository, times(1)).save(comment);
    }

    @Test
    void addCommentToStory_WhenStoryDoesNotExist_ShouldThrowException() {
        // Arrange
        Long storyId = 1L;
        Comment comment = new Comment();
        when(storyRepository.findById(storyId)).thenReturn(Optional.empty());

        // Assert
        assertThrows(RuntimeException.class, () -> commentService.addCommentToStory(storyId, comment));
        verify(storyRepository, times(1)).findById(storyId);
        verify(commentRepository, never()).save(comment);
    }

    @Test
    void deleteCommentById_WhenCommentExists_ShouldReturnTrue() {
        // Arrange
        Long commentId = 1L;
        when(commentRepository.findById(commentId)).thenReturn(Optional.of(new Comment()));

        // Act
        boolean result = commentService.deleteCommentById(commentId);

        // Assert
        assertTrue(result);
        verify(commentRepository, times(1)).deleteById(commentId);
    }

    @Test
    void deleteCommentById_WhenCommentDoesNotExist_ShouldReturnFalse() {
        // Arrange
        Long commentId = 1L;
        when(commentRepository.findById(commentId)).thenReturn(Optional.empty());

        // Act
        boolean result = commentService.deleteCommentById(commentId);

        // Assert
        assertFalse(result);
        verify(commentRepository, never()).deleteById(commentId);
    }

    @Test
    void likeComment_WhenUserAndCommentExistAndUserLikesComment_ShouldReturnLikedMessage() {
        // Arrange
        Long commentId = 1L;
        Long userId = 1L;
        User user = new User();
        Comment comment = new Comment();
        comment.setLikes(new ArrayList<>());
        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        when(commentRepository.findById(commentId)).thenReturn(Optional.of(comment));

        // Act
        String result = commentService.likeComment(commentId, userId);

        // Assert
        assertEquals("User liked comment!", result);
        assertTrue(comment.getLikes().contains(userId));
        verify(userRepository, times(1)).findById(userId);
        verify(commentRepository, times(1)).findById(commentId);
        verify(commentRepository, times(1)).save(comment);
    }

    @Test
    void likeComment_WhenCommentDoesNotExist_ShouldReturnNotFoundMessage() {
        // Arrange
        Long commentId = 1L;
        Long userId = 1L;
        User user = new User();
        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        when(commentRepository.findById(commentId)).thenReturn(Optional.empty());

        // Act
        String result = commentService.likeComment(commentId, userId);

        // Assert
        assertEquals("User or comment cannot be found!", result);
        verify(userRepository, times(1)).findById(userId);
        verify(commentRepository, times(1)).findById(commentId);
        verify(commentRepository, never()).save(any(Comment.class));
    }

    @Test
    void getAllCommentsByUserId_WhenUserHasComments_ShouldReturnComments() {
        // Arrange
        Long userId = 1L;

        Comment comment1 = new Comment();
        comment1.setId(1L);
        comment1.setText("First comment");
        comment1.setUser(new User());
        comment1.setStory(new Story());
        comment1.getLikes().add(1L);

        Comment comment2 = new Comment();
        comment2.setId(2L);
        comment2.setText("Second comment");
        comment2.setUser(new User());
        comment2.setStory(new Story());
        comment2.getLikes().add(2L);

        List<Comment> comments = new ArrayList<>();
        comments.add(comment1);
        comments.add(comment2);

        when(commentRepository.findByUserId(userId)).thenReturn(comments);

        // Act
        List<Comment> result = commentService.getAllCommentsByUserId(userId);

        // Assert
        assertEquals(2, result.size());
        assertEquals(comment1, result.get(0));
        assertEquals(comment2, result.get(1));
    }

    @Test
    void getAllCommentsByUserId_WhenUserHasNoComments_ShouldReturnEmptyList() {
        // Arrange
        Long userId = 1L;
        when(commentRepository.findByUserId(userId)).thenReturn(Collections.emptyList());

        // Act
        List<Comment> result = commentService.getAllCommentsByUserId(userId);

        // Assert
        assertNotNull(result);
        assertTrue(result.isEmpty());
    }
}
