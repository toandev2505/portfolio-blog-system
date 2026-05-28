package com.toandev.portfolio_blog_system.service;

import com.toandev.portfolio_blog_system.dto.ProjectDTO;
import com.toandev.portfolio_blog_system.entity.ProjectEntity;

import java.util.List;

public interface ProjectService {
    List<ProjectDTO> getAllProjects();
    ProjectDTO getProjectById(Long id);

    ProjectEntity createProject(ProjectDTO dto, String currentUsername);
    ProjectEntity updateProject(Long id, ProjectDTO dto);
    void deleteProject(Long id);
}
