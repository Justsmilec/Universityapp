package com.example.librariaServer.repository;

import com.example.librariaServer.model.Faculty;
import com.example.librariaServer.model.Subject;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FacultyRepository extends MongoRepository<Faculty,String> {
    //UserEntity findByUsername(String username);
}