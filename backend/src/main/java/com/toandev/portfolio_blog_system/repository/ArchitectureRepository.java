package com.toandev.portfolio_blog_system.repository;

import com.toandev.portfolio_blog_system.entity.ArchitectureEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ArchitectureRepository extends JpaRepository<ArchitectureEntity, Long> {
}
