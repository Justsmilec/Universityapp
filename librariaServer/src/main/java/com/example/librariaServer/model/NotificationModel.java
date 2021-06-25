package com.example.librariaServer.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
@Document(collection = "Notification")
public class NotificationModel {


    @Id
    private String id;
    private AnnouncmentModel announcmentModel;
    private FriendRequestNotification friendRequestNotification;
    private RequestAcceptedNotificationModel requestAcceptedNotificationModel;
    private Date date;
    private String status;  //read or unread

    public NotificationModel() {
    }

    public NotificationModel(AnnouncmentModel announcmentModel, FriendRequestNotification friendRequestNotification,RequestAcceptedNotificationModel requestAcceptedNotificationModel,String state,Date date) {
        this.announcmentModel = announcmentModel;
        this.friendRequestNotification = friendRequestNotification;
        this.requestAcceptedNotificationModel = requestAcceptedNotificationModel;
        this.status = state;
        this.date = date;
    }

    public RequestAcceptedNotificationModel getRequestAcceptedNotificationModel() {
        return requestAcceptedNotificationModel;
    }

    public void setRequestAcceptedNotificationModel(RequestAcceptedNotificationModel requestAcceptedNotificationModel) {
        this.requestAcceptedNotificationModel = requestAcceptedNotificationModel;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public AnnouncmentModel getAnnouncmentModel() {
        return announcmentModel;
    }

    public void setAnnouncmentModel(AnnouncmentModel announcmentModel) {
        this.announcmentModel = announcmentModel;
    }

    public FriendRequestNotification getFriendRequestNotification() {
        return friendRequestNotification;
    }

    public void setFriendRequestNotification(FriendRequestNotification friendRequestNotification) {
        this.friendRequestNotification = friendRequestNotification;
    }
}
