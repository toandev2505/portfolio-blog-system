package com.toandev.portfolio_blog_system.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "educations")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EducationEntity extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity user;

    @Column(name = "school_name", nullable = false, length = 150)
    private String schoolName;

    @Column(length = 150)
    private String degree;

    @Column(length = 150)
    private String major;

    @Column(name = "from_date", length = 50)
    private String fromDate;

    @Column(name = "to_date", length = 50)
    private String toDate;
}
