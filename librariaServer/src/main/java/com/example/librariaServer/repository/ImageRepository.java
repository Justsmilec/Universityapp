package com.example.librariaServer.repository;

import com.example.librariaServer.model.ImageModel;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ImageRepository extends MongoRepository<ImageModel, String> {
    Optional<ImageModel> findByName(String name);

}
