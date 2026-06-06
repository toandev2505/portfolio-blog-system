package com.toandev.portfolio_blog_system.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "projects")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProjectEntity extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "architecture_id", nullable = false)
    private ArchitectureEntity architecture;

    @Column(nullable = false, length = 150)
    private String title;

    @Column
    private String technologies;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "project_links", columnDefinition = "TEXT")
    private String projectLinks;

    @Column(name = "diagram_links", columnDefinition = "TEXT")
    private String diagramLinks;

    @Column(name = "demo_link")
    private String demoLink;

    @Column(name = "github_link")
    private String githubLink;

    @Column(name = "thumbnail_link")
    private String thumbnailLink;

    @Column(length = 150)
    private String role;

    @Column(name = "team_size")
    private Integer teamSize;

    @Column(name = "highlight_features", columnDefinition = "TEXT")
    private String highlightFeatures;

    @Column(length = 200)
    private String slug;

    @Column(name = "from_date", length = 50)
    private String fromDate;

    @Column(name = "to_date", length = 50)
    private String toDate;
}
