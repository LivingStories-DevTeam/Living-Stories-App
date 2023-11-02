package com.swe573.living_stories.Services;


import com.swe573.living_stories.Models.Activity;
import com.swe573.living_stories.Models.User;
import java.util.Date;
import com.swe573.living_stories.Repositories.ActivityRepository;
import com.swe573.living_stories.Repositories.StoryRepository;
import com.swe573.living_stories.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ActivityService {
    @Autowired
    private StoryRepository storyRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ActivityRepository activityRepository;


    public void recordActivity(Long story_id, Long user_id, String action_type) throws RuntimeException {


        if(!activityRepository.CheckByUserIdAndStoryId(user_id,story_id,action_type).isEmpty()) return; //Prevent duplicate entries for the same activity

        try {
            Activity like_activity;

            like_activity = new Activity();

            like_activity.setUser_id(user_id);
            like_activity.setStory_id(story_id);

            User user = userRepository.getReferenceById(user_id);
            String story_header = storyRepository.getReferenceById(story_id).getHeader();

            like_activity.setStory_title(story_header);
            like_activity.setUser_media(user.getPhoto());
            like_activity.setUser_name(user.getName());

            like_activity.setAction_type(action_type);
            like_activity.setAction_timestamp(new Date());
            activityRepository.save(like_activity);

        }

        catch(RuntimeException e){
            throw new RuntimeException("Activity could not be recorded",e);
        }

    }

    public void recordFollowAction(Long user_id,Long following_id) throws RuntimeException{

        if(!activityRepository.CheckByUserIdAndFollowingId(user_id,following_id).isEmpty()) return; //Prevent duplicate entries for the same activity
        try {
            Activity follow_activity;
            follow_activity = new Activity();

            follow_activity.setUser_id(user_id);
            follow_activity.setUser_name(userRepository.getReferenceById(user_id).getName());
            follow_activity.setUser_media(userRepository.getReferenceById(user_id).getPhoto());

            follow_activity.setFollowing_id(following_id);
            follow_activity.setFollowing_name(userRepository.getReferenceById(following_id).getName());


            follow_activity.setAction_type("Follow");
            follow_activity.setAction_timestamp(new Date());
            activityRepository.save(follow_activity);
        }
        catch(RuntimeException e){
            throw new RuntimeException("Follow Activity could not be recorded",e);
        }


    }

}
