package com.swe573.living_stories.Responses;


import lombok.Data;

@Data
public class FollowerResponse {

    private String photo;
    private String userName;
    private String followerCount;
    private String storyCount;
}
