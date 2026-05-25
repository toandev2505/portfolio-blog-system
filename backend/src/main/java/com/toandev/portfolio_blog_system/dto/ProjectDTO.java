package com.toandev.portfolio_blog_system.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProjectDTO extends BaseDTO {

    private Long userId;
    private String userName;

    private Long architectureId;
    private String architectureName;

    private String title;
    private String description;
    private String technologies;
    private String[] techList;

    private String projectLinks;
    private String diagramLinks;
    private String demoLink;
    private String githubLink;
    private String thumbnailLink;
    private String role;
    private Integer teamSize;
    private String highlightFeatures;
    private String slug;
    private String fromDate;
    private String toDate;
}
