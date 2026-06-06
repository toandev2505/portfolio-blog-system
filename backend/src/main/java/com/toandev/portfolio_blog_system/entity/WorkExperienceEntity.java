package com.toandev.portfolio_blog_system.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "work_experiences")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WorkExperienceEntity extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "architecture_id")
    private ArchitectureEntity architecture;

    @Column(name = "company_name", nullable = false, length = 150)
    private String companyName;

    @Column(nullable = false, length = 150)
    private String position;

    @Column(name = "job_description", columnDefinition = "TEXT")
    private String jobDescription;

    @Column
    private String technologies;

    @Column(name = "from_date", length = 50)
    private String fromDate;

    @Column(name = "to_date", length = 50)
    private String toDate;
}
