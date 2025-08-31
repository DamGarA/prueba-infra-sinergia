package es.sinergia.backend.controller;

import es.sinergia.backend.constant.AuthConstants;
import es.sinergia.backend.dto.auth.AuthDataDTO;
import es.sinergia.backend.exception.AuthenticationException;
import es.sinergia.backend.exception.UnexpectedException;
import es.sinergia.backend.service.auth.AuthService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(allowCredentials = "true", originPatterns = "*")
@PreAuthorize("permitAll()")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }


    public record LoginRequest(String email, String password) {}
    @PostMapping("/login")
    public ResponseEntity<AuthDataDTO> login(@RequestBody LoginRequest credentials, HttpServletResponse response ) throws AuthenticationException, UnexpectedException {
        return ResponseEntity.ok(authService.login(credentials.email(), credentials.password(), response));
    }

    @PostMapping("/refresh")
    public ResponseEntity<AuthDataDTO> refresh(@CookieValue(name = AuthConstants.REFRESH_COOKIE_NAME, required = false) String refreshToken) throws AuthenticationException, UnexpectedException {
        if(refreshToken == null){
            throw new AuthenticationException("MISSING_REFRESH_TOKEN");
        }
        return ResponseEntity.ok(authService.refresh(refreshToken));
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(@CookieValue(name = "REFRESH_TOKEN", required = false) String refreshToken, HttpServletResponse response){
        if(refreshToken != null){
            authService.logout(refreshToken, response);
        }
        return ResponseEntity.ok().build();
    }

}