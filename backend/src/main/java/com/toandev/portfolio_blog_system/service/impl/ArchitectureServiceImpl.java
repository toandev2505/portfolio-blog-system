package com.toandev.portfolio_blog_system.service.impl;

import com.toandev.portfolio_blog_system.converter.ArchitectureConverter;
import com.toandev.portfolio_blog_system.dto.ArchitectureDTO;
import com.toandev.portfolio_blog_system.repository.ArchitectureRepository;
import com.toandev.portfolio_blog_system.service.ArchitectureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ArchitectureServiceImpl implements ArchitectureService {

    @Autowired
    private ArchitectureRepository architectureRepository;

    @Autowired
    private ArchitectureConverter architectureConverter;

    @Override
    public List<ArchitectureDTO> getAllArchitectures() {
        return architectureRepository.findAll().stream()
                .map(architectureConverter::toDTO)
                .collect(Collectors.toList());
    }
}
