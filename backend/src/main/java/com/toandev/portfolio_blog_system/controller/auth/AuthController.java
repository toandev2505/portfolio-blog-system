package com.toandev.portfolio_blog_system.controller.auth;

import com.toandev.portfolio_blog_system.dto.UserDTO;
import com.toandev.portfolio_blog_system.entity.UserEntity;
import com.toandev.portfolio_blog_system.repository.UserRepository;
import com.toandev.portfolio_blog_system.security.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody UserDTO userDTO) {
        try {
            String result = authService.register(userDTO);
            return ResponseEntity.ok(Map.of("message", result));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody Map<String, String> request) {
        try {
            String jwt = authService.login(request);

            String username = request.get("username");
            UserEntity user = userRepository.findOneByUsername(username);

            // Trả về token cho Client dưới dạng JSON
            return ResponseEntity.ok(Map.of(
                    "accessToken", jwt,
                    "tokenType", "Bearer",
                    "role", user.getRole() != null ? user.getRole() : "USER",
                    "user", username
            ));
        } catch (Exception e) {
            return ResponseEntity.status(401).body(Map.of("error", "Sai tên đăng nhập hoặc mật khẩu!"));
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logoutUser() {
        String result = authService.logout();
        return ResponseEntity.ok(Map.of("message", result));
    }
}
