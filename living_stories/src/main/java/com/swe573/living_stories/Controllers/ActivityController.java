package com.swe573.living_stories.Controllers;

import com.swe573.living_stories.Models.Activity;
import com.swe573.living_stories.Models.Comment;
import com.swe573.living_stories.Models.Story;
import com.swe573.living_stories.Models.User;
import com.swe573.living_stories.Repositories.ActivityRepository;
import com.swe573.living_stories.Repositories.UserRepository;
import com.swe573.living_stories.Requests.RecommendationRequest;
import com.swe573.living_stories.Services.StoryService;
import com.swe573.living_stories.Services.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/activity")
public class ActivityController {

    final private UserService userService;

    final private UserRepository userRepository;

    final private ActivityRepository activityRepository;

    final private StoryService storyService;

    public ActivityController(UserService userService, UserRepository userRepository,
                              ActivityRepository activityRepository,
                              StoryService storyService) {
        this.userService = userService;
        this.userRepository = userRepository;
        this.activityRepository = activityRepository;
        this.storyService = storyService;
    }

    @GetMapping
    public ResponseEntity<List<Activity>> getActivityStream(HttpServletRequest request){

        Long id = userService.isUserLoggedIn(request);
        Optional<User> optionalUser = userRepository.findById(id);

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            List<Long> followingIds = user.getFollowing().stream().map(User::getId).collect(Collectors.toList());
            List<Activity> activities = new ArrayList<>();
            Date lastDate = user.getLatestSeenActivityTime();

            for (Long followingId : followingIds) {
                List<Activity> activitiesByUserId = activityRepository.findByUserId(followingId);

                activitiesByUserId.forEach(activity -> {
                    if (lastDate != null && !activity.getAction_timestamp().after(lastDate)) {
                        activity.setNewFlag("N");
                    } else {
                        activity.setNewFlag("Y");
                    }
                });
                activities.addAll(activitiesByUserId);
            }
            activities.sort(Comparator.comparing(Activity::getAction_timestamp).reversed());

            if (!activities.isEmpty()) {
                user.setLatestSeenActivityTime(activities.get(0).getAction_timestamp());
                userRepository.save(user);
            }
            return ResponseEntity.ok(activities);
        }

        return ResponseEntity.notFound().build();
    }

    @GetMapping("/newactivitycount")
    public ResponseEntity<Integer> getNumberOfNewActivities(HttpServletRequest request){

        Long id = userService.isUserLoggedIn(request);
        Optional<User> optionalUser = userRepository.findById(id);

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            List<Long> followingIds = user.getFollowing().stream().map(User::getId).collect(Collectors.toList());
            List<Activity> activities = new ArrayList<>();
            Date lastDate = user.getLatestSeenActivityTime();

            for (Long followingId : followingIds) {
                List<Activity> activitiesByUserId = activityRepository.findByUserId(followingId);

                activitiesByUserId.forEach(activity -> {
                    if (lastDate != null && !activity.getAction_timestamp().after(lastDate)) {
                        activity.setNewFlag("N");
                    } else {
                        activity.setNewFlag("Y");
                    }
                });
                activities.addAll(activitiesByUserId);
            }
            activities.sort(Comparator.comparing(Activity::getAction_timestamp).reversed());

            if (!activities.isEmpty()) {
                long totalNoOfNewActivities = activities.stream()
                        .filter(activity -> "Y".equals(activity.getNewFlag()))
                        .count();
                return ResponseEntity.ok((int) totalNoOfNewActivities);
            } else {
                return ResponseEntity.notFound().build();
            }
        }

        return ResponseEntity.notFound().build();
    }

    @RequestMapping(path = "/recommendedstories", method = RequestMethod.POST)
    public ResponseEntity<List<Story>> postRecommendedStories(@RequestBody RecommendationRequest request) {
        List<Long> storyIDs = request.getStoryIds();
        List<Story> stories = new ArrayList<>();

        for (Long id : storyIDs) {
            stories.add(storyService.getStoryById(id));
        }

        if (!stories.isEmpty()) {
            stories.forEach(story -> {
                story.setRichText(null);
                if (story.getComments() != null) {
                    for (Comment comment : story.getComments()) {
                        comment.setUser(null);
                        comment.setText(null);
                    }
                }
            });
            return ResponseEntity.ok(stories);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}







