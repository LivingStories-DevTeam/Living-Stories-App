package com.swe573.living_stories.Repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.swe573.living_stories.Models.RecommendUser;

@Repository
public interface RecommendUserRepository extends JpaRepository<RecommendUser, Long> {
     Optional<RecommendUser> findByUserId(Long userId);
}
