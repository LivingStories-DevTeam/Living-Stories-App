package com.swe573.living_stories.Controllers;


import com.swe573.living_stories.Configuration.JwtUtils;

import com.swe573.living_stories.Models.User;
import com.swe573.living_stories.Requests.LoginRequest;
import com.swe573.living_stories.Services.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@RestController
@CrossOrigin
public class AuthController {
    @Autowired
    private JwtUtils jwtUtils;
    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest request, HttpServletResponse response) {

        User user = userService.authenticate(request.getEmail(), request.getPassword());
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        }
        String jwtToken = jwtUtils.generateJwtToken(user);
        Cookie cookie = new Cookie("jwt_Token", jwtToken);
        response.addCookie(cookie);
        return ResponseEntity.ok().build();
    }





    @GetMapping("/logout")
    public void logOut(HttpServletRequest request){
        Cookie[] cookies = request.getCookies();

        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("jwt_Token")) {
                    cookie.setMaxAge(0);
                    cookie.setPath("/");
                    HttpServletResponse response = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getResponse();
                    response.addCookie(cookie);
                    System.out.println(cookie);
                }
            }
        }

    }
    





}
