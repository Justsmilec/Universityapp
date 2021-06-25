package com.example.librariaServer.repository;

import com.example.librariaServer.model.UserEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<UserEntity,String> {
    UserEntity findByUsername(String username);
    UserEntity findByPassword(String password);
}
