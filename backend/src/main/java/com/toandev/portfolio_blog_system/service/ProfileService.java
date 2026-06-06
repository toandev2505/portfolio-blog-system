package com.toandev.portfolio_blog_system.service;

import com.toandev.portfolio_blog_system.dto.*;
import com.toandev.portfolio_blog_system.dto.response.PublicProfileResponse;

public interface ProfileService {

    void updatePersonalDetail(Long currentUserId,PersonalDetailDTO req);
    void upsertEducation(Long id, Long targetUserId, EducationDTO req);
    void upsertWorkExperience(Long id, Long targetUserId, WorkExperienceDTO req);
    void upsertSkill(Long id, Long targetUserId, SkillsDTO req);
    void upsertAchievement(Long id, Long targetUserId, AchievementDTO req);
    PublicProfileResponse getPublicProfile(String username);
}
