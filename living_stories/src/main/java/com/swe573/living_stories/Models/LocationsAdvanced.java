package com.swe573.living_stories.Models;

import java.util.ArrayList;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;

@Entity
@Table(name = "locations_advanced")
@Getter
@Setter
public class LocationsAdvanced {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NonNull
    private String name;

    private String city;
    private String country;

    @NonNull
    private String type; 

    @ElementCollection
    private List<List<Double>> coordinates = new ArrayList<>(); 

    private Double radius; 

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "story_id", nullable = false)
    private Story story;
}
