package com.example.librariaServer.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@Document(collection = "SubjectPost")
public class SubjectPostModel {

    @Id
    private String id;
    private String subjectId;
    private String postTitle;
    private String postText;
    private List<LikeModel> likes;
    private List<CommentModel> comments;


    public SubjectPostModel() {
    }

    public SubjectPostModel(String subjectId, String postTitle, String postText, List<LikeModel> likes, List<CommentModel> comments) {
        this.subjectId = subjectId;
        this.postTitle = postTitle;
        this.postText = postText;
        this.likes = likes;
        this.comments = comments;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getSubjectId() {
        return subjectId;
    }

    public void setSubjectId(String subjectId) {
        this.subjectId = subjectId;
    }

    public String getPostTitle() {
        return postTitle;
    }

    public void setPostTitle(String postTitle) {
        this.postTitle = postTitle;
    }

    public String getPostText() {
        return postText;
    }

    public void setPostText(String postText) {
        this.postText = postText;
    }

    public List<LikeModel> getLikes() {
        return likes;
    }

    public void setLikes(List<LikeModel> likes) {
        this.likes = likes;
    }

    public List<CommentModel> getComments() {
        return comments;
    }

    public void setComments(List<CommentModel> comments) {
        this.comments = comments;
    }
}

