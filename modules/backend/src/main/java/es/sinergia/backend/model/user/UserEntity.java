package es.sinergia.backend.model.user;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Entity
@Table(name = "app_user")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserEntity {

    @Id
    private Long id;
    private String email;
    private String password;
    @Convert(converter = RoleSetConverter.class)
    private Set<Role> roles;
    @Column(columnDefinition = "boolean default true")
    private boolean enabled = true;

}