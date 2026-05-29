package com.toandev.portfolio_blog_system.dto;

import com.toandev.portfolio_blog_system.entity.ArchitectureEntity;
import com.toandev.portfolio_blog_system.entity.BaseEntity;
import com.toandev.portfolio_blog_system.entity.UserEntity;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
public class WorkExperienceDTO extends BaseDTO {

    private Long userId;
    private Long architectureId;
    private String companyName;
    private String position;
    private String jobDescription;
    private String technologies;
    private String fromDate;
    private String toDate;
}
