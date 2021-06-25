package com.example.librariaServer.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.List;

@Component
@Document(collection = "UserPost")
public class UserPostModel {

    @Id
    private String id;
    private String userUsername;
    private String postTitle;
    private String postText;
    private List<LikeModel> likes;
    private List<CommentModel> comments;
    private String date;

    public UserPostModel() {
    }

    public UserPostModel(String userUsername, String postTitle, String postText, List<LikeModel> likes, List<CommentModel> comments,String date) {
        this.userUsername = userUsername;
        this.postTitle = postTitle;
        this.postText = postText;
        this.likes = likes;
        this.comments = comments;
        this.date = new Date().toString();
    }


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserUsername() {
        return userUsername;
    }

    public void setUserUsername(String userUsername) {
        this.userUsername = userUsername;
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

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }
}
