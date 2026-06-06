package com.toandev.portfolio_blog_system.repository;

import com.toandev.portfolio_blog_system.entity.WorkExperienceEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WorkExperienceRepository extends JpaRepository<WorkExperienceEntity, Long> {
    List<WorkExperienceEntity> findAllByUserId(Long userId);
}