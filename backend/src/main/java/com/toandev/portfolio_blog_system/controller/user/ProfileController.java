package com.toandev.portfolio_blog_system.controller.user;

import com.toandev.portfolio_blog_system.dto.PersonalDetailDTO;
import com.toandev.portfolio_blog_system.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController(value = "controllerOfUserProfile")
@RequestMapping("/api/v1/profile")
@PreAuthorize("isAuthenticated()")
public class ProfileController {

    @Autowired private ProfileService profileService;

    @PutMapping("/personal-detail")
    public ResponseEntity<?> updatePersonalDetail(@RequestBody PersonalDetailDTO request) {
        Long currentUserId = 1L;

        profileService.updatePersonalDetail(currentUserId, request);
        return ResponseEntity.ok(Map.of("message", "Cập nhật thông tin cá nhân thành công"));
    }
}
