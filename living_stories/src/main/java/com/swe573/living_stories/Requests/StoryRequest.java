package com.swe573.living_stories.Requests;

import com.swe573.living_stories.DTO.MediaDTO;
import com.swe573.living_stories.Models.Locations;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Getter
@Setter
public class StoryRequest {

    private String text;

    private String header;

    private ArrayList<String> labels;

    private ArrayList<Locations> locations;

    private ArrayList<Locations> locationsAdvanced;

    private ArrayList<MediaDTO> mediaString;

    private String startDate;

    private String endDate;

    private String richText;

    private String startSeason;
    private String endSeason;
    private String decade;

    public ArrayList<Locations> getLocations() {
        if (this.locations != null) {
            for (Locations location : this.locations) {
                if (location.getCoordinates() == null) {
                    List<List<Double>> defaultCoordinates = new ArrayList<>();
                    defaultCoordinates.add(Arrays.asList(location.getLng(), location.getLat()));
                    location.setCoordinates(defaultCoordinates);
                }
                if (location.getType() == null) {
                    location.setType("Point");
                }
                if (location.getRadius() == null) {
                    location.setRadius(0.0);
                }
            }
        }
        return locations;
    }

    public void setLocations(ArrayList<Locations> locations) {
        this.locations = locations;
    }
}

