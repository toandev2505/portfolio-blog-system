package com.toandev.portfolio_blog_system.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class PersonalDetailDTO extends BaseDTO {

    private Long userId;
    private String fullName;
    private String title;
    private String bio;
    private String aboutMe;
    private String phone;
    private String address;
    private List<String> socialLinks = new ArrayList<>();
    private String avatarLink;
}
