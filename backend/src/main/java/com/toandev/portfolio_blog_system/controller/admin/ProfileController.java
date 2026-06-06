package com.toandev.portfolio_blog_system.controller.admin;

import com.toandev.portfolio_blog_system.dto.AchievementDTO;
import com.toandev.portfolio_blog_system.dto.EducationDTO;
import com.toandev.portfolio_blog_system.dto.SkillsDTO;
import com.toandev.portfolio_blog_system.dto.WorkExperienceDTO;
import com.toandev.portfolio_blog_system.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController(value = "controllerOfAdminProfile")
@RequestMapping("/api/v1/admin/profile")
@PreAuthorize("hasRole('ADMIN')")
public class ProfileController {

    @Autowired private ProfileService profileService;

    @PutMapping("/educations")
    public ResponseEntity<?> upsertEducation(@RequestParam(value = "id", required = false) Long id,
                                             @RequestParam(value = "userId", required = false) Long userId,
                                             @RequestBody EducationDTO req) {
        if (id == null && userId == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "Thêm mới bắt buộc phải truyền userId"));
        }
        profileService.upsertEducation(id, userId, req);
        return ResponseEntity.ok(Map.of("message", id == null ? "Thêm học vấn thành công" : "Cập nhật học vấn thành công"));
    }

    @PutMapping("/work-experiences")
    public ResponseEntity<?> upsertWorkExperience(@RequestParam(value = "id", required = false) Long id,
                                                  @RequestParam(value = "userId", required = false) Long userId,
                                                  @RequestBody WorkExperienceDTO req) {
        if (id == null && userId == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "Thêm mới bắt buộc phải truyền userId"));
        }
        profileService.upsertWorkExperience(id, userId, req);
        return ResponseEntity.ok(Map.of("message", id == null ? "Thêm kinh nghiệm thành công" : "Cập nhật kinh nghiệm thành công"));
    }

    @PutMapping("/skills")
    public ResponseEntity<?> upsertSkill(@RequestParam(value = "id", required = false) Long id,
                                         @RequestParam(value = "userId", required = false) Long userId,
                                         @RequestBody SkillsDTO req) {
        if (id == null && userId == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "Thêm mới bắt buộc phải truyền userId"));
        }
        profileService.upsertSkill(id, userId, req);
        return ResponseEntity.ok(Map.of("message", id == null ? "Thêm kỹ năng thành công" : "Cập nhật kỹ năng thành công"));
    }

    @PutMapping("/achievements")
    public ResponseEntity<?> upsertAchievement(@RequestParam(value = "id", required = false) Long id,
                                               @RequestParam(value = "userId", required = false) Long userId,
                                               @RequestBody AchievementDTO req) {
        if (id == null && userId == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "Thêm mới bắt buộc phải truyền userId"));
        }
        profileService.upsertAchievement(id, userId, req);
        return ResponseEntity.ok(Map.of("message", id == null ? "Thêm chứng chỉ thành công" : "Cập nhật chứng chỉ thành công"));
    }
}
