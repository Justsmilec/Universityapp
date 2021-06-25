package com.example.librariaServer.model;

public class LikeModel {

    private String userWholiked;

    public LikeModel() {
    }

    public LikeModel(String userWholiked) {
        this.userWholiked = userWholiked;
    }

    public String getUserWholiked() {
        return userWholiked;
    }

    public void setUserWholiked(String userWholiked) {
        this.userWholiked = userWholiked;
    }
}
