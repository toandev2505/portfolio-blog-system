package com.toandev.portfolio_blog_system.repository;

import com.toandev.portfolio_blog_system.entity.AchievementEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AchievementRepository extends JpaRepository<AchievementEntity, Long> {
    List<AchievementEntity> findAllByUserId(Long userId);
}