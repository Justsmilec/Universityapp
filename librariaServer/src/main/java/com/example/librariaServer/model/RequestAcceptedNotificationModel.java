package com.example.librariaServer.model;

public class RequestAcceptedNotificationModel {

    private String useracceptedFriendReqeust;
    private String status;

    public RequestAcceptedNotificationModel(String useracceptedFriendReqeust, String status) {
        this.useracceptedFriendReqeust = useracceptedFriendReqeust;
        this.status = status;
    }


    public RequestAcceptedNotificationModel() {
    }

    public String getUseracceptedFriendReqeust() {
        return useracceptedFriendReqeust;
    }

    public void setUseracceptedFriendReqeust(String useracceptedFriendReqeust) {
        this.useracceptedFriendReqeust = useracceptedFriendReqeust;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
