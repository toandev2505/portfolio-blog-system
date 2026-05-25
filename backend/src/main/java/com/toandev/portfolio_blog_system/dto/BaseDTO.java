package com.toandev.portfolio_blog_system.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public abstract class BaseDTO {

    private Long id;
    private LocalDateTime createdDate;
    private LocalDateTime modifiedDate;
}
