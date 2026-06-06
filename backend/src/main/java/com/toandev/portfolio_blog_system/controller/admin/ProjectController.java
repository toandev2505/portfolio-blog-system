package com.toandev.portfolio_blog_system.controller.admin;

import com.toandev.portfolio_blog_system.dto.ProjectDTO;
import com.toandev.portfolio_blog_system.entity.ProjectEntity;
import com.toandev.portfolio_blog_system.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController(value = "controllerOfAdminProject")
@RequestMapping("/api/v1/admin/projects")
@CrossOrigin(origins = "*")
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    @GetMapping("/{id}")
    public ResponseEntity<?> getProjectById(@PathVariable("id") Long id) {
        try {
            ProjectDTO projectDTO = projectService.getProjectById(id);
            return ResponseEntity.ok(projectDTO);
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ProjectEntity> createProject(
            @RequestBody ProjectDTO projectDTO,
            Authentication authentication) {

        String currentUsername = authentication.getName();

        ProjectEntity createdProject = projectService.createProject(projectDTO, currentUsername);
        return new ResponseEntity<>(createdProject, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ProjectEntity> updateProject(
            @PathVariable Long id,
            @RequestBody ProjectDTO projectRequestDTO) {

        ProjectEntity updatedProject = projectService.updateProject(id, projectRequestDTO);
        return ResponseEntity.ok(updatedProject);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> deleteProject(@PathVariable Long id) {
        projectService.deleteProject(id);
        return ResponseEntity.ok("Xóa dự án thành công!");
    }
}
