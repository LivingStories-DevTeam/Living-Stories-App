package com.swe573.living_stories.Models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Table(name = "activity")
@Getter
@Setter
public class Activity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @NotNull
    private Long user_id;


    @NotBlank
    private String user_name;

    private String user_media;

    @NotBlank
    private String action_type; //Predetermined types are Like, Comment, Post, Follow


    private Long story_id;

    private String story_title;


    private Long following_id;


    private String following_name;

    @NotNull
    private Date action_timestamp;

}
