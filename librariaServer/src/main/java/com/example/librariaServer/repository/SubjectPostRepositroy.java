package com.example.librariaServer.repository;

import com.example.librariaServer.model.NotificationModel;
import com.example.librariaServer.model.SubjectPostModel;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SubjectPostRepositroy  extends MongoRepository<SubjectPostModel,String> {
    List<SubjectPostModel> findBySubjectId(String subjectId);
}
