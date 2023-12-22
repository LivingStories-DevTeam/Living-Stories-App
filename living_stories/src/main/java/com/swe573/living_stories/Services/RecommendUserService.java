package com.swe573.living_stories.Services;

import com.swe573.living_stories.Models.*;
import com.swe573.living_stories.Repositories.RecommendUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
public class RecommendUserService {

    @Autowired
    private RecommendUserRepository recommendUserRepository;

    public RecommendUser getUserById(Long userId) {
        Optional<RecommendUser> optional = recommendUserRepository.findByUserId(userId);
        if (optional.isPresent()) {
            return optional.get();
        }
        else {
            return null;
        }
    }

    public void saveAction(Long userId, Long storyId, String actionType) {
        Optional<RecommendUser> optional = recommendUserRepository.findByUserId(userId);
        if (optional.isPresent()) {
            RecommendUser userAction = optional.get();
            Set<Long> readStoryId;
            Set<Long> likedStoryId;
            if (actionType.equals("R")) {
                if (userAction.getReadStoryId() == null) {
                    readStoryId = new HashSet<Long>();
                } else {
                    readStoryId = userAction.getReadStoryId();
                }
                readStoryId.add(storyId);
                userAction.setReadStoryId(readStoryId);
            } else if (actionType.equals("L")) {
                if (userAction.getReadStoryId() == null) {
                    likedStoryId = new HashSet<Long>();
                } else {
                    likedStoryId = userAction.getReadStoryId();
                }
                likedStoryId.add(storyId);
                userAction.setLikedStoryId(likedStoryId);
            }
            recommendUserRepository.save(userAction);
        } else {
            RecommendUser object = new RecommendUser();
            object.setUserId(userId);
            if (actionType.equals("R")) {
                Set<Long> readStoryId = new HashSet<Long>();
                readStoryId.add(storyId);
                object.setReadStoryId(readStoryId);
            } else if (actionType.equals("L")) {
                Set<Long> likedStoryId = new HashSet<Long>();
                likedStoryId.add(storyId);
                object.setLikedStoryId(likedStoryId);
            }
            recommendUserRepository.save(object);
        }
    }
}
