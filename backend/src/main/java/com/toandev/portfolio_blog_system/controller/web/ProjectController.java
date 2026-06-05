package com.toandev.portfolio_blog_system.controller.web;

import com.toandev.portfolio_blog_system.dto.ProjectDTO;
import com.toandev.portfolio_blog_system.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController(value = "controllerOfWebProject")
@RequestMapping("/api/v1/public/projects")
@CrossOrigin(origins = "*")
public class ProjectController {

    @Autowired private ProjectService projectService;

    @GetMapping
    public ResponseEntity<List<ProjectDTO>> getAllProjects() {
        return ResponseEntity.ok(projectService.getAllProjects());
    }

    @GetMapping("/{slug}")
    public ResponseEntity<?> getProjectBySlug(@PathVariable("slug") String slug) {
        try {
            ProjectDTO projectDTO = projectService.getProjectBySlug(slug);
            return ResponseEntity.ok(projectDTO);
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/{slug}/diagrams")
    public ResponseEntity<?> getProjectDiagrams(@PathVariable String slug) {
        String diagrams = projectService.getProjectDiagramsBySlug(slug);

        if (diagrams == null || diagrams.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("message", "Không tìm thấy sơ đồ cho dự án này"));
        }

        return ResponseEntity.ok(Map.of("diagram_links", diagrams));
    }
}
