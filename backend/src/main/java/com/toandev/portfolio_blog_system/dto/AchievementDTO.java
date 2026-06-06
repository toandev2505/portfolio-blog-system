package com.toandev.portfolio_blog_system.dto;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class AchievementDTO extends BaseDTO {

    private Long userId;
    private String title;
    private String issueDate;
    private String description;
}
