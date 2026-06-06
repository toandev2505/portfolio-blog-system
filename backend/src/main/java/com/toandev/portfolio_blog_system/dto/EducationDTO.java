package com.toandev.portfolio_blog_system.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EducationDTO extends BaseDTO {

    private Long userId;
    private String schoolName;
    private String degree;
    private String major;
    private String fromDate;
    private String toDate;
}
