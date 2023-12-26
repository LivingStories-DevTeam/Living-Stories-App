package com.swe573.living_stories.DTO;
import com.fasterxml.jackson.annotation.JsonIncludeProperties;
import com.swe573.living_stories.Models.Comment;
import com.swe573.living_stories.Models.Locations;
import com.swe573.living_stories.Models.User;

import java.util.ArrayList;
import java.util.Arrays;

import lombok.Getter;
import lombok.Setter;
@Getter
@Setter

public class StoryDTO {

    private final Long id;
    private final String header;

    private final ArrayList<String> labels;

    private final ArrayList<Long> likes;

   private final ArrayList<Locations> locations;
    private final ArrayList<Locations> locationsAdvanced;
    private final String startSeason;

    private final String endSeason;

    private final String startDate;

    private final String endDate;
    private final String decade;

    private final Comment[]  comments;

    @JsonIncludeProperties(value = { "id", "name", "photo" })
    private final User user;


    public StoryDTO(Long id, String header, ArrayList<String> labels, ArrayList<Long> likes, ArrayList<Locations> locations,
                    ArrayList<Locations> locationsAdvance, String startSeason, String endSeason, String startDate, String endDate, String decade, int comments_size, User user){
        this.id = id;
        this.header = header;
        this.labels = labels;
        this.likes = likes;
        this.locations = locations;
        this.locationsAdvanced = locationsAdvance;

        this.startSeason = startSeason;
        this.endSeason = endSeason;
        this.startDate = startDate;
        this.endDate = endDate;
        this.decade = decade;
        Comment[] emptyArray = new Comment[comments_size];
        Arrays.fill(emptyArray,null);
        this.comments = emptyArray;
        this.user = user;
    }

    public StoryDTO(){
        this.locations = null;
        this.locationsAdvanced =null;
        this.comments = null;
        this.id = null;
        this.header = null;
        this.labels = null;
        this.likes = null;
        this.startSeason = null;
        this.endSeason = null;
        this.startDate = null;
        this.endDate = null;
        this.decade = null;
        this.user = null;
    }


}
