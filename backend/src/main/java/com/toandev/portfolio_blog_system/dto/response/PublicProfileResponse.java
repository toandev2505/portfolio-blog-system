package com.toandev.portfolio_blog_system.dto.response;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PublicProfileResponse {
    private String username;
    private PersonalDetailInfo personalDetail;
    private List<EducationInfo> educations;
    private List<WorkExperienceInfo> workExperiences;
    private List<SkillInfo> skills;
    private List<AchievementInfo> achievements;

    @Getter @Setter @Builder
    public static class PersonalDetailInfo {
        private String fullName;
        private String title;
        private String bio;
        private String aboutMe;
        private String phone;
        private String address;
        private List<String> socialLinks;
        private String avatarLink;
    }

    @Getter @Setter @Builder
    public static class EducationInfo {
        private Long id;
        private String schoolName;
        private String degree;
        private String major;
        private String fromDate;
        private String toDate;
    }

    @Getter @Setter @Builder
    public static class WorkExperienceInfo {
        private Long id;
        private String companyName;
        private String position;
        private String jobDescription;
        private String technologies;
        private String architectureName; // Lấy tên kiến trúc từ bảng liên kết
        private String fromDate;
        private String toDate;
    }

    @Getter @Setter @Builder
    public static class SkillInfo {
        private Long id;
        private String skillName;
        private String skillCategory;
    }

    @Getter @Setter @Builder
    public static class AchievementInfo {
        private Long id;
        private String title;
        private String issueDate;
        private String description;
    }
}
