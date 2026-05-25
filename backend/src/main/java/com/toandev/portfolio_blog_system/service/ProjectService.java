package com.toandev.portfolio_blog_system.service;

import com.toandev.portfolio_blog_system.dto.ProjectDTO;

import java.util.List;

public interface ProjectService {
    List<ProjectDTO> getAllProjects();
    ProjectDTO getProjectById(Long id);
}
