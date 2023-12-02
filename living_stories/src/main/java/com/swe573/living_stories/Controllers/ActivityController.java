package com.swe573.living_stories.Controllers;

import com.swe573.living_stories.Models.Activity;
import com.swe573.living_stories.Models.User;
import com.swe573.living_stories.Repositories.ActivityRepository;
import com.swe573.living_stories.Repositories.UserRepository;
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

    final private UserService userService;

    final private UserRepository userRepository;

    final private ActivityRepository activityRepository;

    public ActivityController(UserService userService, UserRepository userRepository,
                              ActivityRepository activityRepository) {
        this.userService = userService;
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
            Date lastDate = user.getLatestSeenActivityTime();

            for (Long followingId : followingIds) {
                List<Activity> activitiesByUserId = activityRepository.findByUserId(followingId);

                activitiesByUserId.forEach(activity -> {
                    if (lastDate != null && activity.getAction_timestamp().before(lastDate)) {
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
                    if (lastDate != null && activity.getAction_timestamp().before(lastDate)) {
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
}







