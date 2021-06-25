package com.example.librariaServer.repository;

import com.example.librariaServer.model.Dege;
import com.example.librariaServer.model.Subject;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DegeRepository extends MongoRepository<Dege,String> {
    //UserEntity findByUsername(String username);
}
