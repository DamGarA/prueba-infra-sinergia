package es.sinergia.backend.dto.auth;

import es.sinergia.backend.model.user.Role;

import java.util.Set;

public record AuthDataDTO(String accessToken, Set<Role> roles) {}
