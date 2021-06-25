package com.example.librariaServer.model;

import org.springframework.data.annotation.Id;

import java.util.Date;

public class FriendRequestNotification {

    private String userWhoSendReqeust;
    private String status;

    public FriendRequestNotification(String userWhoSendReqeust, String status) {
        this.userWhoSendReqeust = userWhoSendReqeust;
        this.status = status;
    }

    public FriendRequestNotification() {
    }

    public String getUserWhoSendReqeust() {
        return userWhoSendReqeust;
    }

    public void setUserWhoSendReqeust(String userWhoSendReqeust) {
        this.userWhoSendReqeust = userWhoSendReqeust;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}

