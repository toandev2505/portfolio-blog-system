package com.toandev.portfolio_blog_system.repository;

import com.toandev.portfolio_blog_system.entity.EducationEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EducationRepository extends JpaRepository<EducationEntity, Long> {
    List<EducationEntity>  findAllByUserId(Long userId);
}