package com.toandev.portfolio_blog_system.repository;

import com.toandev.portfolio_blog_system.entity.EducationEntity;
import com.toandev.portfolio_blog_system.entity.SkillsEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SkillsRepository extends JpaRepository<SkillsEntity, Long> {
    List<SkillsEntity> findAllByUserId(Long userId);
}