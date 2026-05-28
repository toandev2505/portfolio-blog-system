package com.toandev.portfolio_blog_system.controller.web;

import com.toandev.portfolio_blog_system.dto.ArchitectureDTO;
import com.toandev.portfolio_blog_system.service.ArchitectureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/public/architectures")
@CrossOrigin(origins = "*")
public class ArchitectureController {

    @Autowired
    private ArchitectureService architectureService;

    @GetMapping
    public ResponseEntity<List<ArchitectureDTO>> getAllArchitectures() {
        return ResponseEntity.ok(architectureService.getAllArchitectures());
    }
}
