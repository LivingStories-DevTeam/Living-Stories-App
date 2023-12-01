package com.swe573.living_stories.Services;


import com.swe573.living_stories.Models.Activity;
import com.swe573.living_stories.Models.User;
import com.swe573.living_stories.Repositories.ActivityRepository;
import com.swe573.living_stories.Repositories.StoryRepository;
import com.swe573.living_stories.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

import static com.swe573.living_stories.Constants.ActivityConstants.*;

@Service
public class ActivityService {
    @Autowired
    private StoryRepository storyRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ActivityRepository activityRepository;

    public void recordLikeActivity(final Long story_id, final Long user_id) throws RuntimeException {
        recordBaseActivity(story_id, user_id, ACTIVITY_TYPE_LIKE);
    }

    public void recordPostStoryActivity(final Long story_id, final Long user_id) throws RuntimeException {
        recordBaseActivity(story_id, user_id, ACTIVITY_TYPE_STORY);
    }

    public void recordCommentActivity(final Long story_id, final Long user_id) throws RuntimeException {
        recordBaseActivity(story_id, user_id, ACTIVITY_TYPE_COMMENT);
    }

    public void recordFollowActivity(final Long following_id, final Long user_id) throws RuntimeException {
        recordBaseActivity(following_id, user_id, ACTIVITY_TYPE_FOLLOW);
    }

    public void recordBaseActivity(final Long actionItemId, final Long user_id, final String action_type)
            throws RuntimeException {

        if (!checkDuplicateActivity(actionItemId, user_id, action_type)) {
            return;
        }

        User user = userRepository.getReferenceById(user_id);
        Activity activity = new Activity();
        activity.setUser_id(user.getId());
        activity.setUser_name(user.getName());
        activity.setUser_media(user.getPhoto());
        activity.setAction_timestamp(new Date());
        activity.setAction_type(action_type);

        if (!action_type.equals("F")) {
            activity.setStory_id(actionItemId);
            activity.setStory_title(storyRepository.getReferenceById(actionItemId).getHeader());
        } else {
            activity.setFollowing_id(actionItemId);
            activity.setFollowing_name(userRepository.getReferenceById(actionItemId).getName());
        }

        try {
            activityRepository.save(activity);
        } catch (RuntimeException e) {
            throw new RuntimeException("Follow Activity could not be recorded", e);
        }
    }

    public boolean checkDuplicateActivity(final Long actionItemId, final Long user_id, final String action_type)
            throws RuntimeException {

        if (!action_type.equals(ACTIVITY_TYPE_FOLLOW)) {
            return activityRepository.CheckByUserIdAndStoryId(user_id,actionItemId,action_type).isEmpty(); //Prevent duplicate entries for the same activity
        } else {
            return activityRepository.CheckByUserIdAndFollowingId(user_id,actionItemId).isEmpty(); //Prevent duplicate entries for the same activity
        }
    }
}
