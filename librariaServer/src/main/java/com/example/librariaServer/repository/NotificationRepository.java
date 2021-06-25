package com.example.librariaServer.repository;

import com.example.librariaServer.model.Faculty;
import com.example.librariaServer.model.NotificationModel;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface NotificationRepository extends MongoRepository<NotificationModel,String> {

}
