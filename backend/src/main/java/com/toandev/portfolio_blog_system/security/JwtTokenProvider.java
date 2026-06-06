package com.toandev.portfolio_blog_system.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class JwtTokenProvider {

    // Đọc chuỗi secret cố định từ file application.properties
    @Value("${jwt.secret}")
    private String jwtSecret;

    private final long JWT_EXPIRATION = 86400000L;

    // Hàm chuyển đổi chuỗi String config sang đối tượng Key bảo mật
    private Key getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(jwtSecret);
        if (keyBytes.length < 32) {
            // Nếu chuỗi của bạn ngắn quá, tự động băm chuỗi để đảm bảo độ dài an toàn cho thuật toán HS256
            return Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8));
        }
        return Keys.hmacShaKeyFor(keyBytes);
    }

    // Tạo JWT có chứa cả Username và danh sách Quyền hạn (Roles)
    public String generateToken(Authentication authentication) {
        UserDetails userPrincipal = (UserDetails) authentication.getPrincipal();
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + JWT_EXPIRATION);

        // Lấy danh sách quyền chuyển thành mảng String (Ví dụ: ["ROLE_USER", "ROLE_ADMIN"])
        List<String> roles = userPrincipal.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        Claims claims = Jwts.claims().setSubject(userPrincipal.getUsername());
        claims.put("roles", roles); // Ép Roles vào token để FE hoặc Filter bóc tách không cần gọi DB

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    // Lấy username từ JWT
    public String getUsernameFromJWT(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();

        return claims.getSubject();
    }

    // Xác thực xem Token có hợp lệ không
    public boolean validateToken(String authToken) {
        try {
            Jwts.parserBuilder().setSigningKey(getSigningKey()).build().parseClaimsJws(authToken);
            return true;
        } catch (SecurityException | MalformedJwtException e) {
            System.err.println("JWT Validation Failed: Chuỗi ký tự hoặc chữ ký không khớp!");
        } catch (ExpiredJwtException e) {
            System.err.println("JWT Validation Failed: Token đã hết hạn sử dụng!");
        } catch (UnsupportedJwtException e) {
            System.err.println("JWT Validation Failed: Định dạng Token không được hỗ trợ!");
        } catch (IllegalArgumentException e) {
            System.err.println("JWT Validation Failed: Chuỗi Claims rỗng hoặc sai cấu trúc!");
        }
        return false;
    }
}
