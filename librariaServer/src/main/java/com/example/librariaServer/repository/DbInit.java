package com.example.librariaServer.repository;

import com.example.librariaServer.model.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

//@Service
public class DbInit implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        //Delete all from db
        userRepository.deleteAll();

        //add users manually
        //UserEntity user1 = new UserEntity("User1",this.passwordEncoder.encode("12345elb"));
        //UserEntity user2 = new UserEntity("User2",this.passwordEncoder.encode("12345elb"));

        //List<UserEntity> list = Arrays.asList(user1,user2);
        //save to db
        //this.userRepository.saveAll(list);

    }
}
