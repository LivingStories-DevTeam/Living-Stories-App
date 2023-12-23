package com.swe573.living_stories.Repositories;

import com.swe573.living_stories.Models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findUserByEmail(String eMail);

    Optional<User> findByName(String name);

    List<User> findByNameContainingIgnoreCase(String name);

    @Query(value = "SELECT count(following_id) FROM followers WHERE following_id = :user_id", nativeQuery = true)
    Integer getFollowerCount(@Param("user_id") Long user_id);

    @Query(value = "SELECT count(user_id) FROM stories WHERE user_id = :user_id", nativeQuery = true)
    Integer getStoryCount(@Param("user_id") Long user_id);

}