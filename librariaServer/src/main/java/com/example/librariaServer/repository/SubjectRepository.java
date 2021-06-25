package com.example.librariaServer.repository;

import com.example.librariaServer.model.Subject;
import com.example.librariaServer.model.UserEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;



    @Repository
    public interface SubjectRepository extends MongoRepository<Subject,String> {
        //UserEntity findByUsername(String username);
    }

