package com.toandev.portfolio_blog_system.repository;

import com.toandev.portfolio_blog_system.entity.ProjectEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProjectRepository extends JpaRepository<ProjectEntity, Long> {
    Optional<ProjectEntity> findOneBySlug(String slug);
}
