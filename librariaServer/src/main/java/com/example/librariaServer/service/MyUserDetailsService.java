package com.example.librariaServer.service;
import com.example.librariaServer.model.UserEntity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import com.example.librariaServer.model.MyUserPrincipal;
import com.example.librariaServer.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) {
        UserEntity user = userRepository.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException(username);
        }
        UserDetails mp = User.withUsername(user.getUsername()).password(user.getPassword()).authorities("admin").build();
        System.out.println("---: "+ mp.getUsername() + " -- "+ mp.getPassword());
        return  mp;
    }
}
