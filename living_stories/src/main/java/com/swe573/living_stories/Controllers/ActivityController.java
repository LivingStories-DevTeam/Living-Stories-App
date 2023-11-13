package com.swe573.living_stories.Controllers;

import com.swe573.living_stories.Models.*;
import com.swe573.living_stories.Repositories.ActivityRepository;
import com.swe573.living_stories.Repositories.UserRepository;
import com.swe573.living_stories.Services.CommentService;
import com.swe573.living_stories.Services.StoryService;
import com.swe573.living_stories.Services.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/activity")
public class ActivityController {


    final private StoryService storyService;
    final private UserService userService;
    final private CommentService commentService;

    final private UserRepository userRepository;

    final private ActivityRepository activityRepository;

    public ActivityController(StoryService storyService, UserService userService, CommentService commentService,
                              UserRepository userRepository, ActivityRepository activityRepository) {
        this.storyService = storyService;
        this.userService = userService;
        this.commentService = commentService;
        this.userRepository = userRepository;
        this.activityRepository = activityRepository;
    }

    @GetMapping
    public ResponseEntity<List<Activity>> getActivityStream(HttpServletRequest request){

        Long id = userService.isUserLoggedIn(request);
        Optional<User> optionalUser = userRepository.findById(id);

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            List<Long> followingIds = user.getFollowing().stream().map(User::getId).collect(Collectors.toList());
            List<Activity> activities = new ArrayList<>();
            for (Long followingId : followingIds) {
                List<Activity> activitiesByUserId = activityRepository.findByUserId(followingId);
                activities.addAll(activitiesByUserId);
            }
            return ResponseEntity.ok(activities);
        }

        return ResponseEntity.notFound().build();
    }

    public List<Story> getStoriesPostedBy(HttpServletRequest request){
        Long id = userService.isUserLoggedIn(request);
        return  storyService.getFollowingStories(id);
    }

    public List<Story> getStoriesCommentedBy(HttpServletRequest request) {

        Long id = userService.isUserLoggedIn(request);
        Optional<User> optionalUser = userRepository.findById(id);

        if (optionalUser.isPresent()) {

            User user = optionalUser.get();
            List<Long> followingIds = user.getFollowing().stream().map(User::getId).collect(Collectors.toList());
            List<Comment> comments = new ArrayList<>();
            for (Long followingId : followingIds) {
                List<Comment> commentsByUserId = commentService.getAllCommentsByUserId(followingId);
                comments.addAll(commentsByUserId);
            }

            List<Story> stories = new ArrayList<>();
            for (Comment comment : comments) {
                stories.add(comment.getStory());
            }

            return stories;
        }
        return null;
    }

    public List<Story> getStoriesLikedBy(HttpServletRequest request) {
        return null;
    }
}







