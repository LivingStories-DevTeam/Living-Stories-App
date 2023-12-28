package com.swe573.living_stories.Controllers;

import com.swe573.living_stories.DTO.StoryDTO;
import com.swe573.living_stories.Models.*;
import com.swe573.living_stories.DTO.MediaDTO;
import com.swe573.living_stories.Requests.AdvancedSearchRequest;
import com.swe573.living_stories.Requests.SearchRequest;
import com.swe573.living_stories.Requests.StoryRequest;
import com.swe573.living_stories.Services.StoryService;
import com.swe573.living_stories.Services.UserService;
import com.swe573.living_stories.Services.ActivityService;
import com.swe573.living_stories.Services.RecommendUserService;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.*;

@RestController
@RequestMapping("/stories")
@CrossOrigin
public class StoryController {
    @Autowired
    UserService userService;

    @Autowired
    private StoryService storyService;

    @Autowired
    private RecommendUserService recommendUserService;

    @Autowired
    ActivityService activityService;

    @PostMapping
    public ResponseEntity<Story> createStory(@RequestBody StoryRequest storyRequest, HttpServletRequest request) {
        Long id = userService.isUserLoggedIn(request);
        Optional<User> optionalUser = userService.getUserById(id);
        if (!optionalUser.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        Story story = new Story();
        if (storyRequest.getDecade() != null) {
            story.setDecade(storyRequest.getDecade());
        }
        story.setText(storyRequest.getText());
        story.setUser(optionalUser.get());
        story.setHeader(storyRequest.getHeader());
        story.setLabels(storyRequest.getLabels());
        story.setRichText(storyRequest.getRichText());
        story.setTimestamp(new Date());
        Story savedStory = storyService.createStory(story);
        if (storyRequest.getLocations() != null) {
            storyService.addLocation(savedStory.getId(), storyRequest.getLocations());
        }
        if (storyRequest.getMediaString() != null) {
            storyService.addMedia(savedStory.getId(), storyRequest.getMediaString());

        }
        if (storyRequest.getStartDate() != null) {
            storyService.addStartDate(savedStory.getId(), storyRequest.getStartDate());
        }
        if (storyRequest.getEndDate() != null) {
            storyService.addEndDate(savedStory.getId(), storyRequest.getEndDate());
        }
        if (storyRequest.getStartSeason() != null) {
            storyService.addSeason(savedStory.getId(), storyRequest.getStartSeason(), 0);
        }
        if (storyRequest.getEndSeason() != null) {
            storyService.addSeason(savedStory.getId(), storyRequest.getEndSeason(), 1);
        }

        activityService.recordPostStoryActivity(savedStory.getId(), optionalUser.get().getId());

        return ResponseEntity.ok(savedStory);
    }

    @PostMapping("/advanced")
    public ResponseEntity<Story> createStoryAdvanced(@RequestBody StoryRequest storyRequest,
            HttpServletRequest request) {
        Long id = userService.isUserLoggedIn(request);
        Optional<User> optionalUser = userService.getUserById(id);
        if (!optionalUser.isPresent())
            return ResponseEntity.notFound().build();
        Story story = new Story();
        if (storyRequest.getDecade() != null)
            story.setDecade(storyRequest.getDecade());
        story.setText(storyRequest.getText());
        story.setUser(optionalUser.get());
        story.setHeader(storyRequest.getHeader());
        story.setLabels(storyRequest.getLabels());
        story.setRichText(storyRequest.getRichText());
        Story savedStory = storyService.createStory(story);
        if (storyRequest.getLocationsAdvanced() != null)
            storyService.addLocationAdvanced(savedStory.getId(), storyRequest.getLocationsAdvanced());
        if (storyRequest.getMediaString() != null)
            storyService.addMedia(savedStory.getId(), storyRequest.getMediaString());
        if (storyRequest.getStartDate() != null)
            storyService.addStartDate(savedStory.getId(), storyRequest.getStartDate());
        if (storyRequest.getEndDate() != null)
            storyService.addEndDate(savedStory.getId(), storyRequest.getEndDate());
        if (storyRequest.getStartSeason() != null)
            storyService.addSeason(savedStory.getId(), storyRequest.getStartSeason(), 0);
        if (storyRequest.getEndSeason() != null)
            storyService.addSeason(savedStory.getId(), storyRequest.getEndSeason(), 1);
        return ResponseEntity.ok(savedStory);
    }

    @GetMapping("/following")
    public List<Story> getFollowingUsers(HttpServletRequest request) {
        Long id = userService.isUserLoggedIn(request);
        return storyService.getFollowingStories(id);
    }

    @PostMapping("/edit/{id}")
    public ResponseEntity<Story> updateStory(@PathVariable Long id, @RequestBody StoryRequest storyRequest,
            HttpServletRequest request) {
        Long userId = userService.isUserLoggedIn(request);
        Story existingStory = storyService.getStoryById(id);
        if (existingStory != null) {

            Story updatedStory = storyService.updateStory(id, storyRequest);
            return ResponseEntity.ok(updatedStory);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/{id}/photo")
    public List<MediaDTO> getMeida(@PathVariable Long id, HttpServletRequest request) {
        userService.isUserLoggedIn(request);
        Story story = storyService.getStoryById(id);
        if (story.getMedia() != null) {
            List<Media> media = story.getMedia();
            List<MediaDTO> mediaDTOList = new ArrayList<>();
            for (Media photos : media) {
                mediaDTOList.add(new MediaDTO(photos.getType(), photos.getData()));
            }
            return mediaDTOList;
        }
        return null;
    }

    @GetMapping
    public ResponseEntity<List<StoryDTO>> getAllStories(HttpServletRequest request) {
        Long userId = userService.isUserLoggedIn(request);

        List<StoryDTO> stories = storyService.getAllStories();

        return ResponseEntity.ok(stories);
    }

    @GetMapping("/commentliked/{id}")

    public String commentLikedOrNor(@PathVariable Long id, HttpServletRequest request) {
        Long userId = userService.isUserLoggedIn(request);

        Story story = storyService.getStoryById(id);
        if (story != null) {

            List<Comment> comments = story.getComments();
            if (comments != null) {
                for (Comment comment : comments) {
                    if (comment.getLikes() != null && comment.getLikes().contains(userId)) {
                        return "yes";
                    }

                }

            }

        }
        return "no";
    }

    @GetMapping("/storyliked/{id}")
    public String likedOrNor(@PathVariable Long id, HttpServletRequest request) {
        Long userId = userService.isUserLoggedIn(request);

        Story story = storyService.getStoryById(id);
        if (story != null) {

            if (story.getLikes() != null && story.getLikes().contains(userId)) {
                return "yes";
            }
        }
        return "no";
    }

    @GetMapping("/{id}")
    public ResponseEntity<Story> getStoryById(@PathVariable Long id, HttpServletRequest request) {
        Long userId = userService.isUserLoggedIn(request);
        Story story = storyService.getStoryById(id);
        if (story != null) {
            recommendUserService.saveAction(userId, story.getId(), "R");
            return ResponseEntity.ok(story);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/get")
    public List<Story> getUserStories(HttpServletRequest request) {
        Long userId = userService.isUserLoggedIn(request);
        return storyService.getByUserId(userId);
    }

    @PostMapping("/search")
    public List<Story> search(HttpServletRequest request, @RequestBody SearchRequest searchRequest) {
        userService.isUserLoggedIn(request);
        return storyService.newsearch(searchRequest);
    }

    @PostMapping("/advancedsearch")
    public List<Story> advancedSearch(HttpServletRequest request, @RequestBody AdvancedSearchRequest searchRequest)
            throws ParseException {
        userService.isUserLoggedIn(request);
        return storyService.advancedSearch(searchRequest);
    }

    @PostMapping("/intervalsearch")
    public List<Story> intervalSearch(HttpServletRequest request, @RequestBody SearchRequest searchRequest) {
        userService.isUserLoggedIn(request);
        return storyService.intervalSearch(searchRequest);
    }

    @GetMapping("/delete/{id}")
    public String delete(@PathVariable Long id) {
        storyService.deleteStoryById(id);
        return "done";
    }

    @GetMapping("/userActionDetails/{userId}")
    public RecommendUser userActionDetails(@PathVariable Long userId) {
        return recommendUserService.getUserById(userId);
    }

    @PostMapping("/like/{storyId}")
    public String likeStory(HttpServletRequest request, @PathVariable Long storyId) {
        Long userId = userService.isUserLoggedIn(request);
        String return_string = storyService.likeStory(storyId, userId);
        if (return_string.equals("User liked story!")) {
            activityService.recordLikeActivity(storyId, userId);
        }
        recommendUserService.saveAction(userId, storyId, "L");
        return return_string;
    }

}
