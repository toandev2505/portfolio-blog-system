package com.toandev.portfolio_blog_system.service.impl;

import com.toandev.portfolio_blog_system.converter.ProjectConverter;
import com.toandev.portfolio_blog_system.dto.ProjectDTO;
import com.toandev.portfolio_blog_system.entity.ArchitectureEntity;
import com.toandev.portfolio_blog_system.entity.ProjectEntity;
import com.toandev.portfolio_blog_system.entity.UserEntity;
import com.toandev.portfolio_blog_system.repository.ArchitectureRepository;
import com.toandev.portfolio_blog_system.repository.ProjectRepository;
import com.toandev.portfolio_blog_system.repository.UserRepository;
import com.toandev.portfolio_blog_system.service.ProjectService;
import com.toandev.portfolio_blog_system.util.SlugUtil;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProjectServiceImpl implements ProjectService {

    @Autowired private ProjectRepository projectRepository;
    @Autowired private ProjectConverter projectConverter;
    @Autowired private UserRepository userRepository;
    @Autowired private ArchitectureRepository architectureRepository;

    @Override
    public List<ProjectDTO> getAllProjects() {
        return projectRepository.findAll().stream()
                .map(projectConverter::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public ProjectDTO getProjectById(Long id) {
        ProjectEntity project = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy dự án với ID: " + id));
        return projectConverter.toDTO(project);
    }

    @Override
    public ProjectDTO getProjectBySlug(String slug) {
        ProjectEntity project = projectRepository.findOneBySlug(slug)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy dự án với đường dẫn: " + slug));

        ProjectDTO dto = new ProjectDTO();

        dto.setId(project.getId());
        dto.setCreatedDate(project.getCreatedDate());

        if (project.getUser() != null) {
            dto.setUserId(project.getUser().getId());
            dto.setUserName(project.getUser().getUsername()); // Hoặc tên hiển thị tùy bạn thiết kế
        }

        if (project.getArchitecture() != null) {
            dto.setArchitectureId(project.getArchitecture().getId());
            dto.setArchitectureName(project.getArchitecture().getName()); // Đảm bảo trường này trùng khớp Entity Architecture
        }

        dto.setTitle(project.getTitle());
        dto.setDescription(project.getDescription());
        dto.setTechnologies(project.getTechnologies());

        if (project.getTechnologies() != null && !project.getTechnologies().isBlank()) {
            String[] techs = project.getTechnologies().split(",");
            for (int i = 0; i < techs.length; i++) {
                techs[i] = techs[i].trim(); // Xóa khoảng trắng thừa
            }
            dto.setTechList(techs);
        } else {
            dto.setTechList(new String[0]);
        }

        dto.setProjectLinks(project.getProjectLinks());
        dto.setDiagramLinks(project.getDiagramLinks());
        dto.setDemoLink(project.getDemoLink());
        dto.setGithubLink(project.getGithubLink());
        dto.setThumbnailLink(project.getThumbnailLink());
        dto.setRole(project.getRole());
        dto.setTeamSize(project.getTeamSize());
        dto.setHighlightFeatures(project.getHighlightFeatures());
        dto.setSlug(project.getSlug());
        dto.setFromDate(project.getFromDate());
        dto.setToDate(project.getToDate());

        return dto;
    }

    @Transactional
    @Override
    public ProjectEntity createProject(ProjectDTO dto, String currentUsername) {
        UserEntity user = userRepository.findOneByUsername(currentUsername);
        if (userRepository.findOneByUsername(user.getUsername()) == null) {
            throw new RuntimeException("Không tìm thấy tài khoản người dùng: " + currentUsername);
        }

        ArchitectureEntity architecture = architectureRepository.findById(dto.getArchitectureId())
                .orElseThrow(() -> new EntityNotFoundException("Không tìm thấy kiến trúc ID: " + dto.getArchitectureId()));

        ProjectEntity project = ProjectEntity.builder()
                .user(user)
                .architecture(architecture)
                .title(dto.getTitle())
                .technologies(dto.getTechnologies())
                .description(dto.getDescription())
                .projectLinks(dto.getProjectLinks())
                .diagramLinks(dto.getDiagramLinks())
                .demoLink(dto.getDemoLink())
                .githubLink(dto.getGithubLink())
                .thumbnailLink(dto.getThumbnailLink())
                .role(dto.getRole())
                .teamSize(dto.getTeamSize())
                .highlightFeatures(dto.getHighlightFeatures())
                .slug(SlugUtil.toSlug(dto.getTitle())) // Tự động tạo slug: "Hệ thống HEMIS" -> "he-thong-hemis"
                .fromDate(dto.getFromDate())
                .toDate(dto.getToDate())
                .build();

        return projectRepository.save(project);
    }

    @Transactional
    @Override
    public ProjectEntity updateProject(Long id, ProjectDTO dto) {
        ProjectEntity existingProject = projectRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Không tìm thấy dự án với ID: " + id));

        if (!existingProject.getArchitecture().getId().equals(dto.getArchitectureId())) {
            ArchitectureEntity newArchitecture = architectureRepository.findById(dto.getArchitectureId())
                    .orElseThrow(() -> new EntityNotFoundException("Không tìm thấy kiến trúc ID: " + dto.getArchitectureId()));
            existingProject.setArchitecture(newArchitecture);
        }

        existingProject.setTitle(dto.getTitle());
        existingProject.setTechnologies(dto.getTechnologies());
        existingProject.setDescription(dto.getDescription());
        existingProject.setProjectLinks(dto.getProjectLinks());
        existingProject.setDiagramLinks(dto.getDiagramLinks());
        existingProject.setDemoLink(dto.getDemoLink());
        existingProject.setGithubLink(dto.getGithubLink());
        existingProject.setThumbnailLink(dto.getThumbnailLink());
        existingProject.setRole(dto.getRole());
        existingProject.setTeamSize(dto.getTeamSize());
        existingProject.setHighlightFeatures(dto.getHighlightFeatures());
        existingProject.setFromDate(dto.getFromDate());
        existingProject.setToDate(dto.getToDate());

        existingProject.setSlug(SlugUtil.toSlug(dto.getTitle()));

        return projectRepository.save(existingProject);
    }

    @Transactional
    @Override
    public void deleteProject(Long id) {
        if (!projectRepository.existsById(id)) {
            throw new EntityNotFoundException("Không tìm thấy dự án với ID: " + id);
        }
        projectRepository.deleteById(id);
    }
}
