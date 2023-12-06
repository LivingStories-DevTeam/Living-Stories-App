package com.swe573.living_stories.Repositories;

import com.swe573.living_stories.Models.Activity;
import com.swe573.living_stories.Models.Like;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface ActivityRepository extends JpaRepository<Activity, Long> {

    @Query(value = "SELECT * FROM Activity a WHERE a.user_id = :user_id and a.story_id = :story_id and a.action_type = :action LIMIT 1", nativeQuery = true)
    List<Activity> CheckByUserIdAndStoryId(@Param("user_id") Long user_id, @Param("story_id") Long story_id, @Param("action") String action);



    @Query(value = "SELECT * FROM Activity a WHERE a.user_id = :user_id and a.following_id = :following_id LIMIT 1", nativeQuery = true)
    List<Activity> CheckByUserIdAndFollowingId(@Param("user_id") Long user_id, @Param("following_id") Long following_id);


    @Query(value = "SELECT * FROM Activity a WHERE a.user_id = :user_id ORDER BY a.action_timestamp DESC", nativeQuery = true)
    List<Activity> findByUserId(@Param("user_id") Long user_id);
}
