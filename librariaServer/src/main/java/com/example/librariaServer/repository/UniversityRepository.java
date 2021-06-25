package com.example.librariaServer.repository;

import com.example.librariaServer.model.Subject;
import com.example.librariaServer.model.University;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UniversityRepository extends MongoRepository<University,String> {
    //UserEntity findByUsername(String username);
}