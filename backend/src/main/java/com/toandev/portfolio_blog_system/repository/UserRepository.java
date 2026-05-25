package com.toandev.portfolio_blog_system.repository;

import com.toandev.portfolio_blog_system.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<UserEntity, Long> {
}
