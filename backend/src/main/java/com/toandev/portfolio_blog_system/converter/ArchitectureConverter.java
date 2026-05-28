package com.toandev.portfolio_blog_system.converter;

import com.toandev.portfolio_blog_system.dto.ArchitectureDTO;
import com.toandev.portfolio_blog_system.entity.ArchitectureEntity;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class ArchitectureConverter {
    public ArchitectureDTO toDTO(ArchitectureEntity entity) {
        if (entity == null) {
            return null;
        }

        ArchitectureDTO dto = new ArchitectureDTO();

        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setCreatedDate(entity.getCreatedDate());
        dto.setModifiedDate(entity.getModifiedDate());

        return dto;
    }

    public List<ArchitectureDTO> toDTOList(List<ArchitectureEntity> entities) {
        if (entities == null) {
            return null;
        }
        return entities.stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }
}
