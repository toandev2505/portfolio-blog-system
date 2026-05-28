package com.toandev.portfolio_blog_system.security;

import com.toandev.portfolio_blog_system.converter.UserConverter;
import com.toandev.portfolio_blog_system.dto.UserDTO;
import com.toandev.portfolio_blog_system.entity.UserEntity;
import com.toandev.portfolio_blog_system.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class AuthService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    private UserConverter userConverter;

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    public String register(UserDTO userDTO) {
        if (userRepository.findOneByUsername(userDTO.getUsername()) != null) {
            throw new RuntimeException("Tên tài khoản này đã tồn tại trên hệ thống!");
        }

        UserEntity userEntity = userConverter.toEntity(userDTO);

        userRepository.save(userEntity);

        return "Đăng ký tài khoản thành công!";
    }

    public String login(Map<String, String> request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.get("username"), request.get("password"))
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        UserDetails userDetails = customUserDetailsService.loadUserByUsername(request.get("username"));

        UsernamePasswordAuthenticationToken verifiedAuthentication =
                new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

        return tokenProvider.generateToken(verifiedAuthentication);
    }

    public String logout() {
        SecurityContextHolder.clearContext();
        return "Đăng xuất thành công!";
    }
}
