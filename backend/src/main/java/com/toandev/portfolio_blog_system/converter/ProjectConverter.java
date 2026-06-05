package com.toandev.portfolio_blog_system.converter;

import com.toandev.portfolio_blog_system.dto.ProjectDTO;
import com.toandev.portfolio_blog_system.entity.ArchitectureEntity;
import com.toandev.portfolio_blog_system.entity.ProjectEntity;
import com.toandev.portfolio_blog_system.entity.UserEntity;
import com.toandev.portfolio_blog_system.repository.ArchitectureRepository;
import com.toandev.portfolio_blog_system.repository.UserRepository;
import org.jspecify.annotations.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ProjectConverter {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ArchitectureRepository architectureRepository;

    public ProjectDTO toDTO(ProjectEntity entity){
        if (entity == null) return null;

        ProjectDTO dto = new ProjectDTO();

        // Gán các trường kế thừa từ lớp cha BaseDTO
        dto.setId(entity.getId());
        dto.setCreatedDate(entity.getCreatedDate());
        dto.setModifiedDate(entity.getModifiedDate());

        // Gán các trường của lớp con ProjectDTO
        dto.setUserId(entity.getUser() != null ? entity.getUser().getId() : null);
        dto.setUserName(entity.getUser() != null ? entity.getUser().getUsername() : null);
        dto.setArchitectureId(entity.getArchitecture() != null ? entity.getArchitecture().getId() : null);
        dto.setArchitectureName(entity.getArchitecture() != null ? entity.getArchitecture().getName() : null);

        dto.setTitle(entity.getTitle());
        dto.setDescription(entity.getDescription());
        dto.setTechnologies(entity.getTechnologies());

        // Xử lý cắt chuỗi công nghệ thành mảng cho Frontend
        String[] techArray = entity.getTechnologies() != null
                ? entity.getTechnologies().split(",\\s*")
                : new String[0];
        dto.setTechList(techArray);

        String[] diagramLinkList = entity.getDiagramLinks() != null
                ? entity.getDiagramLinks().split(",\\s*")
                : new String[0];

        dto.setProjectLinks(entity.getProjectLinks());
        dto.setDiagramLinkList(diagramLinkList);
        dto.setDemoLink(entity.getDemoLink());
        dto.setGithubLink(entity.getGithubLink());
        dto.setThumbnailLink(entity.getThumbnailLink());
        dto.setRole(entity.getRole());
        dto.setTeamSize(entity.getTeamSize());
        dto.setHighlightFeatures(entity.getHighlightFeatures());
        dto.setSlug(entity.getSlug());
        dto.setFromDate(entity.getFromDate());
        dto.setToDate(entity.getToDate());

        return dto;
    }

    public ProjectEntity toEntity(ProjectDTO dto){
        if (dto == null) return null;

        UserEntity user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy User với ID: " + dto.getUserId()));

        ArchitectureEntity architecture = architectureRepository.findById(dto.getArchitectureId())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy Kiến trúc với ID: " + dto.getArchitectureId()));

        return getProjectEntity(dto, user, architecture);
    }

    private static @NonNull ProjectEntity getProjectEntity(ProjectDTO dto, UserEntity user, ArchitectureEntity architecture) {
        ProjectEntity entity = new ProjectEntity();
        entity.setUser(user);
        entity.setArchitecture(architecture);
        entity.setTitle(dto.getTitle());
        entity.setTechnologies(dto.getTechnologies());
        entity.setDescription(dto.getDescription());
        entity.setProjectLinks(dto.getProjectLinks());
        entity.setDiagramLinks(dto.getDiagramLinks());
        entity.setDemoLink(dto.getDemoLink());
        entity.setGithubLink(dto.getGithubLink());
        entity.setThumbnailLink(dto.getThumbnailLink());
        entity.setRole(dto.getRole());
        entity.setTeamSize(dto.getTeamSize());
        entity.setHighlightFeatures(dto.getHighlightFeatures());
        entity.setSlug(dto.getSlug());
        entity.setFromDate(dto.getFromDate());
        entity.setToDate(dto.getToDate());
        return entity;
    }
}
