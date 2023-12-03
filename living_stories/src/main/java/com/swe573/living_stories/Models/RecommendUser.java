package com.swe573.living_stories.Models;

import java.util.Set;

import io.micrometer.common.lang.Nullable;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "recommendUser")
@Getter
@Setter

public class RecommendUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Nullable
    private Long userId;

    @Nullable
    private Set<Long> readStoryId;

    @Nullable
    private Set<Long> likedStoryId;
}