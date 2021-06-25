package com.example.librariaServer.model;

public class AnnouncmentModel {


    private String postId;
    private String status;

    public AnnouncmentModel(String postId, String status) {
        this.postId = postId;
        this.status = status;
    }

    public AnnouncmentModel() {
    }

    public String getPostId() {
        return postId;
    }

    public void setPostId(String postId) {
        this.postId = postId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
