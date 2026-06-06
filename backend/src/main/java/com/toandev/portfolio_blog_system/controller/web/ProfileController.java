package com.toandev.portfolio_blog_system.controller.web;

import com.toandev.portfolio_blog_system.dto.response.PublicProfileResponse;
import com.toandev.portfolio_blog_system.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController(value = "controllerOfWebProfile")
@RequestMapping("/api/v1/public/profile")
public class ProfileController {

    @Autowired private ProfileService profileService;

    @GetMapping("/{username}")
    public ResponseEntity<PublicProfileResponse> getProfileByUsername(@PathVariable String username) {
        PublicProfileResponse response = profileService.getPublicProfile(username);
        return ResponseEntity.ok(response);
    }
}
