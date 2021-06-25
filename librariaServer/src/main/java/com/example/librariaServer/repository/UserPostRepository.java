package com.example.librariaServer.repository;

import com.example.librariaServer.model.SubjectPostModel;
import com.example.librariaServer.model.UserPostModel;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface UserPostRepository extends MongoRepository<UserPostModel,String> {
    List<UserPostModel> findByUserUsername(String username);

}
