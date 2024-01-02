package com.swe573.living_stories.Models;

import java.util.ArrayList;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.transaction.Transactional;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;

@Transactional
@Entity
@Table(name = "locations")
@Getter
@Setter
public class Locations {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NonNull
    private Double lat;

    @NonNull
    private Double lng;

    @NonNull
    private String name;

    private String city;
    private String country;

    private String type; 

    @ElementCollection(fetch = FetchType.EAGER)
    private List<List<Double>> coordinates = new ArrayList<>(); 

    private Double radius; 

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "story_id", nullable = false)
    private Story story;
}
