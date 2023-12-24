package com.swe573.living_stories.Services;

import com.swe573.living_stories.Configuration.DateParser;
import com.swe573.living_stories.DTO.MediaDTO;
import com.swe573.living_stories.DTO.StoryDTO;
import com.swe573.living_stories.Models.*;
import com.swe573.living_stories.Repositories.StoryRepository;
import com.swe573.living_stories.Repositories.UserRepository;
import com.swe573.living_stories.Requests.AdvancedSearchRequest;
import com.swe573.living_stories.Requests.SearchRequest;
import com.swe573.living_stories.Requests.StoryRequest;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.geotools.geometry.jts.JTSFactoryFinder;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.Geometry;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.LinearRing;
import org.locationtech.jts.geom.Point;
import org.locationtech.jts.geom.Polygon;
import org.locationtech.jts.geom.impl.CoordinateArraySequence;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class StoryService {

    @Autowired
    private StoryRepository storyRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private DateParser dateParser;

    public Story createStory(Story story) {
        return storyRepository.save(story);
    }

    public Story updateStory(Long id, StoryRequest secondStory) {
        Story oldStory = storyRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Story not found with id: " + id));

        if (secondStory.getRichText() != null) {
            oldStory.setRichText(secondStory.getRichText());
        }
        if (secondStory.getHeader() != null) {
            oldStory.setHeader(secondStory.getHeader());
        }
        if (secondStory.getLabels() != null) {
            oldStory.setLabels(secondStory.getLabels());
        }

        return storyRepository.save(oldStory);
    }

    public List<StoryDTO> getAllStories() {
        return mapToDTOList(storyRepository.findAllOrdered());
    }
    public List<StoryDTO> mapToDTOList(List<Story> stories) {
        return stories.stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }
    public StoryDTO mapToDTO(Story story) {
        return new StoryDTO(
                story.getId(),
                story.getHeader(),
                story.getLabels(),
                story.getLikes(),
                new ArrayList<Locations>(story.getLocations()),  // Assuming locations is a Collection
                story.getStartSeason(),
                story.getEndSeason(),
                DateParser.getDateFromDate(story.getStartDate()),
                DateParser.getDateFromDate(story.getEndDate()),
                story.getDecade(),
                new ArrayList<Comment>(story.getComments()),  // Assuming comments is a Collection
                story.getUser());
    }
    public Story getStoryById(Long id) {
        Optional<Story> story = storyRepository.findById(id);
        if (story.isPresent()) {
            return story.get();
        }
        return null;
    }

    public List<Story> getByUserId(Long userId) {
        return storyRepository.findByUserId(userId);
    }

    public void deleteStoryById(Long storyId) {
        Optional<Story> optionalStory = storyRepository.findById(storyId);
        if (optionalStory.isPresent()) {
            storyRepository.deleteById(storyId);
        }

    }

    public List<Story> getFollowingStories(Long id) {
        Optional<User> optionalUser = userRepository.findById(id);
        List<Story> result = new ArrayList<>();
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            List<Long> followingIds = user.getFollowing().stream().map(User::getId).collect(Collectors.toList());
            result = storyRepository.findByUserIdIn(followingIds);
        }
        return result;
    }

    public String likeStory(Long storyId, Long userId) {
        Optional<User> optionalUser = userRepository.findById(userId);
        Optional<Story> optionalComment = storyRepository.findById(storyId);
        if (optionalComment.isPresent() && optionalUser.isPresent()) {
            Story story = optionalComment.get();
            ArrayList<Long> likes = story.getLikes();
            if (!likes.contains(userId)) {

                likes.add(userId);
                story.setLikes(likes);
                storyRepository.save(story);
                return "User liked story!";
            } else if (likes.contains(userId)) {
                likes.remove(userId);
                story.setLikes(likes);
                storyRepository.save(story);
                return "User unliked story";

            }

        }

        return "User or comment can not be found!";

    }

    public boolean addLocation(Long storyId, List<Locations> locationsList) {
        Optional<Story> optionalStory = storyRepository.findById(storyId);
        if (optionalStory.isPresent()) {
            Story story = optionalStory.get();
            for (Locations location : locationsList) {
                location.setStory(story);
                location.setType(location.getType());
                location.setCoordinates(location.getCoordinates());
                location.setRadius(location.getRadius());
            }
            story.setLocations(locationsList);
            storyRepository.save(story);
            return true;
        }
        return false;
    }

    public boolean addLocationAdvanced(Long storyId, List<Locations> locationsList) {
        Optional<Story> optionalStory = storyRepository.findById(storyId);
        if (optionalStory.isPresent()) {
            Story story = optionalStory.get();
            for (Locations location : locationsList) {
                location.setStory(story);
                location.setType(location.getType());
                location.setCoordinates(location.getCoordinates());
                location.setRadius(location.getRadius());
            }
            story.setLocationsAdvanced(locationsList);
            storyRepository.save(story);
            return true;
        }
        return false;
    }

    public boolean addMedia(Long storyId, ArrayList<MediaDTO> media) {
        Optional<Story> optionalStory = storyRepository.findById(storyId);
        if (optionalStory.isPresent()) {

            ArrayList<Media> mediaArrayList = new ArrayList<>();
            Story story = optionalStory.get();
            for (MediaDTO datas : media) {

                Media media_db = new Media();
                byte[] decodedBytes = Base64.getDecoder().decode(datas.getData());
                media_db.setStory(story);
                media_db.setData(decodedBytes);
                media_db.setType(datas.getType());
                mediaArrayList.add(media_db);
                System.out.println(media_db.toString());

            }
            story.setMedia(mediaArrayList);

            storyRepository.save(story);
        }

        return false;
    }

    public void addStartDate(Long storyId, String startDate) {
        Optional<Story> optionalStory = storyRepository.findById(storyId);
        if (optionalStory.isPresent()) {

            Story story = optionalStory.get();
            Date date = DateParser.parseDate(startDate);
            story.setStartDate(date);

            storyRepository.save(story);

        }
    }

    public void addEndDate(Long storyId, String endDate) {
        Optional<Story> optionalStory = storyRepository.findById(storyId);
        if (optionalStory.isPresent()) {
            Story story = optionalStory.get();
            Date date = DateParser.parseDate(endDate);
            story.setEndDate(date);
            storyRepository.save(story);

        }
    }

    public void addSeason(Long storyId, String season, int flag) {
        Optional<Story> optionalStory = storyRepository.findById(storyId);
        if (optionalStory.isPresent()) {
            Story story = optionalStory.get();
            if (flag == 0) {
                story.setStartSeason(season);
            } else if (flag == 1) {
                story.setEndSeason(season);
            }
            storyRepository.save(story);
        }
    }

    public List<Story> advancedSearch(AdvancedSearchRequest searchRequest) throws ParseException {
        if (searchRequest.getStartDate() == null)
            searchRequest.setStartDate(new SimpleDateFormat("yyyy-MM-dd").parse("1000-01-01"));
        if (searchRequest.getEndDate() == null)
            searchRequest.setEndDate(new SimpleDateFormat("yyyy-MM-dd").parse("9999-12-31"));
        List<Story> stories = storyRepository.searchAdvanced(searchRequest.getKey(), searchRequest.getStartDate(),
                searchRequest.getEndDate(), searchRequest.getIsInterval());
        List<Story> storiesAll = storyRepository.findAll();
        List<Story> filteredStories = new ArrayList<>();
        for (Story story : stories) {
            if (searchCriteria(story, searchRequest)) {
                filteredStories.add(story);
            }
        }
        /**
         * TODO: Refactor this method to leverage JPA's querying capabilities.
         * Currently, the label matching is performed programmatically. To optimize
         * this,
         * the 'label' property in the corresponding entity should be converted to a
         * collection-based relationship (e.g., @OneToMany or @ManyToMany). This change
         * will enable
         * direct and efficient querying for label matching using JPA's query methods,
         * reducing the need for
         * manual filtering and improving overall performance.
         */
        if (searchRequest.getKey() != null) {
            for (Story story : storiesAll) {
                boolean labelMatches = story.getLabels() != null && story.getLabels().stream()
                        .anyMatch(label -> label.toLowerCase().contains(searchRequest.getKey().toLowerCase()));
                boolean dateInRange = (story.getStartDate() == null
                        || !story.getStartDate().before(searchRequest.getStartDate())) &&
                        (story.getEndDate() == null || !story.getEndDate().after(searchRequest.getEndDate()));
                if (searchCriteria(story, searchRequest) && labelMatches && dateInRange) {
                    filteredStories.add(story);
                }
            }
        }
        Set<Long> storyIds = new HashSet<>();
        List<Story> uniqueFilteredStories = new ArrayList<>();
        for (Story story : filteredStories) {
            if (storyIds.add(story.getId())) {
                uniqueFilteredStories.add(story);
            }
        }
        uniqueFilteredStories.sort(Comparator.comparing(Story::getStartDate));
        return uniqueFilteredStories;
    }

    private boolean searchCriteria(Story story, AdvancedSearchRequest request) {
        if (request.getRadius() != null) {
            GeometryFactory geometryFactory = JTSFactoryFinder.getGeometryFactory();
            Point searchCenter = geometryFactory
                    .createPoint(new Coordinate(request.getLongitude(), request.getLatitude()));
            double radiusInDegrees = metersToDegrees(request.getRadius());
            for (Locations location : story.getLocationsAdvanced()) {
                if (locationMatches(location, searchCenter, radiusInDegrees, geometryFactory))
                    return true;
            }
            return false;
        } else
            return true;
    }

    private double metersToDegrees(double meters) {
        return meters / 111320.0;
    }

    private boolean locationMatches(Locations location, Point searchCenter, double radiusInDegrees,
            GeometryFactory geometryFactory) {
        String type = location.getType();
        if (type == null) {
            type = "Point";
        }
        switch (type) {
            case "Point":
                return markerMatches(location, searchCenter, radiusInDegrees, geometryFactory);
            case "Circle":
                return circleMatches(location, searchCenter, radiusInDegrees, geometryFactory);
            case "Polygon":
                return polygonMatches(location, searchCenter, radiusInDegrees, geometryFactory);
            default:
                return markerMatches(location, searchCenter, radiusInDegrees, geometryFactory);
        }
    }

    private boolean markerMatches(Locations location, Point searchCenter, double radiusInDegrees, GeometryFactory geometryFactory) {
        List<List<Double>> coordinates = location.getCoordinates();
        double lat, lng;
        if (coordinates.isEmpty() || coordinates.get(0).isEmpty()) {
            lat = location.getLat();
            lng = location.getLng();
        } else {
            List<Double> latLng = coordinates.get(0);
            lat = latLng.get(0);
            lng = latLng.get(1);
        }
        Point locationPoint = geometryFactory.createPoint(new Coordinate(lat, lng));
        return locationPoint.isWithinDistance(searchCenter, radiusInDegrees);
    }

    private boolean circleMatches(Locations location, Point searchCenter, double radiusInDegrees,
            GeometryFactory geometryFactory) {
        List<Double> centerLatLng = location.getCoordinates().get(0);
        Point center = geometryFactory.createPoint(new Coordinate(centerLatLng.get(0), centerLatLng.get(1)));
        double localRadiusInDegrees = metersToDegrees(location.getRadius());
        Geometry circle = createCircle(center, localRadiusInDegrees, geometryFactory);
        return circle.intersects(searchCenter.buffer(radiusInDegrees));
    }

    private Geometry createCircle(Point center, double radius, GeometryFactory geometryFactory) {
        int sides = 32;
        Coordinate coords[] = new Coordinate[sides + 1];
        for (int i = 0; i < sides; i++) {
            double angle = ((double) i / (double) sides) * Math.PI * 2.0;
            double dx = Math.cos(angle) * radius;
            double dy = Math.sin(angle) * radius;
            coords[i] = new Coordinate(center.getX() + dx, center.getY() + dy);
        }
        coords[sides] = coords[0];
        LinearRing ring = geometryFactory.createLinearRing(coords);
        Polygon circle = geometryFactory.createPolygon(ring, null);
        return circle;
    }

    private boolean polygonMatches(Locations location, Point searchCenter, double radiusInDegrees,
            GeometryFactory geometryFactory) {
        List<List<Double>> coordinatesList = location.getCoordinates();
        Coordinate[] coordinates = new Coordinate[coordinatesList.size()];
        for (int i = 0; i < coordinatesList.size(); i++) {
            List<Double> point = coordinatesList.get(i);
            coordinates[i] = new Coordinate(point.get(0), point.get(1)); // Longitude, Latitude
        }
        Polygon polygon = geometryFactory
                .createPolygon(new LinearRing(new CoordinateArraySequence(coordinates), geometryFactory), null);
        return polygon.intersects(searchCenter.buffer(radiusInDegrees));
    }

    public List<Story> intervalSearch(SearchRequest searchRequest) {
        Double latRangeMin = null;
        Double latRangeMax = null;
        Double lngRangeMin = null;
        Double lngRangeMax = null;
        if (searchRequest.getRadius() != null) {
            Double latitude = searchRequest.getLatitude();
            Double longitude = searchRequest.getLongitude();
            Double radius = searchRequest.getRadius();

            latRangeMin = latitude - (radius / 110.574);
            latRangeMax = latitude + (radius / 110.574);
            lngRangeMin = longitude - (radius / (111.320 * Math.cos(Math.toRadians(latitude))));
            lngRangeMax = longitude + (radius / (111.320 * Math.cos(Math.toRadians(latitude))));

        }

        List<Story> stories = storyRepository.search(searchRequest.getHeader(), searchRequest.getName(),
                searchRequest.getCity(), searchRequest.getCountry(), searchRequest.getText(), latRangeMin, latRangeMax,
                lngRangeMin, lngRangeMax, searchRequest.getStartSeason(), searchRequest.getEndSeason());
        if (searchRequest.getLabel() != null) {
            String label = searchRequest.getLabel();
            Iterator<Story> iterator = stories.iterator();
            while (iterator.hasNext()) {
                Story story = iterator.next();
                if (!story.getLabels().contains(label)) {
                    iterator.remove();
                }
            }
        }

        List<Story> result = new ArrayList<>();

        if (searchRequest.getStartDate() != null && searchRequest.getEndDate() == null) {
            Date startDate = DateParser.parseDate(searchRequest.getStartDate());
            for (Story story : stories) {
                if (story.getStartDate() != null && story.getStartDate().after(startDate)) {
                    result.add(story);
                }
            }
        } else if (searchRequest.getStartDate() != null && searchRequest.getEndDate() != null) {
            Date endDate = DateParser.parseDate(searchRequest.getEndDate());
            Date startDate = DateParser.parseDate(searchRequest.getStartDate());
            for (Story story : stories) {
                if (story.getStartDate() != null && story.getStartDate().after(startDate) && story.getEndDate() == null
                        && story.getStartDate().before(endDate)) {
                    result.add(story);
                } else if (story.getStartDate() != null && story.getStartDate().after(startDate)
                        && story.getEndDate() != null && story.getEndDate().before(endDate)) {
                    result.add(story);
                }
            }
        }

        else if (searchRequest.getStartDate() == null && searchRequest.getEndDate() != null) {
            Date endDate = DateParser.parseDate(searchRequest.getEndDate());
            for (Story story : stories) {
                if (story.getStartDate() != null && story.getStartDate().before(endDate)) {
                    result.add(story);
                }
            }
        }
        if (searchRequest.getStartDate() == null && searchRequest.getEndDate() == null) {
            return stories;
        }

        return result;
    }

    public List<Story> newsearch(SearchRequest searchRequest) {
        Double latRangeMin = null;
        Double latRangeMax = null;
        Double lngRangeMin = null;
        Double lngRangeMax = null;
        if (searchRequest.getRadius() != null) {
            Double latitude = searchRequest.getLatitude();
            Double longitude = searchRequest.getLongitude();
            Double radius = searchRequest.getRadius();

            latRangeMin = latitude - (radius / 110.574);
            latRangeMax = latitude + (radius / 110.574);
            lngRangeMin = longitude - (radius / (111.320 * Math.cos(Math.toRadians(latitude))));
            lngRangeMax = longitude + (radius / (111.320 * Math.cos(Math.toRadians(latitude))));

        }

        List<Story> stories = storyRepository.search(searchRequest.getHeader(), searchRequest.getName(),
                searchRequest.getCity(), searchRequest.getCountry(), searchRequest.getText(), latRangeMin, latRangeMax,
                lngRangeMin, lngRangeMax, searchRequest.getStartSeason(), searchRequest.getEndSeason());
        if (searchRequest.getLabel() != null) {
            String label = searchRequest.getLabel();
            Iterator<Story> iterator = stories.iterator();
            while (iterator.hasNext()) {
                Story story = iterator.next();
                if (!story.getLabels().contains(label)) {
                    iterator.remove();
                }
            }
        }

        List<Story> result = new ArrayList<>();

        if (searchRequest.getStartDate() != null && searchRequest.getEndDate() == null) {
            Date startDate = DateParser.parseDate(searchRequest.getStartDate());
            for (Story story : stories) {
                if (story.getStartDate() != null && story.getStartDate().after(startDate)) {
                    result.add(story);
                }
            }
        } else if (searchRequest.getStartDate() != null && searchRequest.getEndDate() != null) {
            Date endDate = DateParser.parseDate(searchRequest.getEndDate());
            Date startDate = DateParser.parseDate(searchRequest.getStartDate());
            for (Story story : stories) {
                if (story.getStartDate() != null && story.getStartDate().after(startDate)
                        && story.getStartDate().before(endDate)) {
                    result.add(story);
                }
            }
        }

        else if (searchRequest.getStartDate() == null && searchRequest.getEndDate() != null) {
            Date endDate = DateParser.parseDate(searchRequest.getEndDate());
            for (Story story : stories) {
                if (story.getStartDate() != null && story.getStartDate().before(endDate)) {
                    result.add(story);
                }
            }
        }
        if (searchRequest.getStartDate() == null && searchRequest.getEndDate() == null) {
            return stories;
        }

        return result;
    }

}
