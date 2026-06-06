package com.toandev.portfolio_blog_system.repository;

import com.toandev.portfolio_blog_system.entity.PersonalDetailEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PersonalDetailRepository extends JpaRepository<PersonalDetailEntity, Long> {
    PersonalDetailEntity findOneByUserId(Long id);
}