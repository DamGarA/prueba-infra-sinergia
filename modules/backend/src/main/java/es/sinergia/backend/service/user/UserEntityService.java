package es.sinergia.backend.service.user;

import es.sinergia.backend.exception.NotFoundException;
import es.sinergia.backend.model.user.CustomUserDetails;
import es.sinergia.backend.model.user.UserEntity;
import es.sinergia.backend.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Slf4j
public class UserEntityService implements UserDetailsService {

    private final UserRepository userRepository;

    public UserEntityService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByEmail(username).map(CustomUserDetails::new).orElseThrow(()->new UsernameNotFoundException(username));
    }

    @Transactional(readOnly = true)
    public Optional<UserEntity> findByEmail(String email){
        return userRepository.findByEmail(email);
    }

    @Transactional
    public UserEntity saveOrUpdate(UserEntity userEntity) {
        return userRepository.save(userEntity);
    }

    @Transactional(readOnly = true)
    public UserEntity findById(long userId) throws NotFoundException {
        return userRepository.findById(userId).orElseThrow(()->new NotFoundException("USER_NOT_FOUND"));
    }

}