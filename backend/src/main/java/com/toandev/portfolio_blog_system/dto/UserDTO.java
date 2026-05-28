package com.toandev.portfolio_blog_system.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDTO extends BaseDTO {

    private String username;
    private String email;
    private String password;
    private String role;
    private Integer status;
}
