package com.swe573.living_stories.Repositories;


import com.swe573.living_stories.Models.Like;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LikeRepository extends JpaRepository<Like, Long> {


    List<Like> findByUserId(Long userId);

}
