package com.swe573.living_stories.Models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Table(name = "activitiy")
@Getter
@Setter
public class Activity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @NotBlank
    private Long user_id;


    @NotBlank
    private String user_name;

    @NotBlank
    private Byte user_media;

    @NotBlank
    private String action_type;


    private Long story_id;

    private String story_title;


    private Long following_id;


    private String following_name;

    @NotBlank
    private Date action_timestamp;

}
