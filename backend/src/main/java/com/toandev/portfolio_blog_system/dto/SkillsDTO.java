package com.toandev.portfolio_blog_system.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SkillsDTO extends BaseDTO {

    private Long userId;
    private String skillName;
    private String skillCategory;
}
