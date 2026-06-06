package com.toandev.portfolio_blog_system.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "personal_details")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PersonalDetailEntity extends BaseEntity {
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private UserEntity user;

    @Column(name = "full_name", nullable = false, length = 100)
    private String fullName;

    @Column(length = 150)
    private String title;

    @Column
    private String bio;

    @Column(name = "about_me", columnDefinition = "TEXT")
    private String aboutMe;

    @Column(length = 10)
    private String phone;

    @Column
    private String address;

    @Column(name = "social_links", columnDefinition = "TEXT")
    private String socialLinks;

    @Column(name = "avatar_link")
    private String avatarLink;
}
