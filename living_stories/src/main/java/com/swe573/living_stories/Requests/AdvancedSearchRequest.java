package com.swe573.living_stories.Requests;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdvancedSearchRequest {
    private Date startDate;
    private Date endDate;
    private Boolean isInterval;
    private String key;
    private Double longitude;
    private Double latitude;
    private Double radius;
}
