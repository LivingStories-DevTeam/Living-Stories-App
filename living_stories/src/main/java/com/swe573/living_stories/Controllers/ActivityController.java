package com.swe573.living_stories.Controllers;

import com.swe573.living_stories.Models.Comment;
import com.swe573.living_stories.Models.Like;
import com.swe573.living_stories.Models.Story;
import com.swe573.living_stories.Models.User;
import com.swe573.living_stories.Repositories.UserRepository;
import com.swe573.living_stories.Services.CommentService;
import com.swe573.living_stories.Services.StoryService;
import com.swe573.living_stories.Services.UserService;
import jakarta.servlet.http.HttpServletRequest;
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

    public ActivityController(StoryService storyService, UserService userService, CommentService commentService, UserRepository userRepository) {
        this.storyService = storyService;
        this.userService = userService;
        this.commentService = commentService;
        this.userRepository = userRepository;
    }

    @GetMapping
    public List<Story> getActivityStream(HttpServletRequest request){
        List<Story> storiesFromBase = getStoriesPostedBy(request);
        List<Story> storiesFromComments = getStoriesCommentedBy(request);
        List<Story> storiesFromLikes = getStoriesLikedBy(request);

        Map<Long, Story> storyMap = new HashMap<>();
        List<Story> uniqueStories = new ArrayList<>();

        for (List<Story> stories : Arrays.asList(storiesFromBase, storiesFromComments, storiesFromLikes)) {
            for (Story story : stories) {
                if (!storyMap.containsKey(story.getId())) {
                    storyMap.put(story.getId(), story);
                    uniqueStories.add(story);
                }
            }
        }

        return uniqueStories;
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







