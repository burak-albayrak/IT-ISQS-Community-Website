package com.devEra.ws.api;

import com.devEra.ws.business.AuthService;
import com.devEra.ws.core.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private JwtService jwtService;

    @PostMapping("/register")
    public String register(@RequestParam String name, 
                           @RequestParam String surname, 
                           @RequestParam String email, 
                           @RequestParam String password) {
        return authService.registerUser(name, surname, email, password);
    }

    @GetMapping("/verify")
    public String verify(@RequestParam String token) {
        return authService.verifyEmail(token);
    }

    @PostMapping("/login")
    public String login(@RequestParam String email, @RequestParam String password) {
        return jwtService.generateToken(email);
    }
}
