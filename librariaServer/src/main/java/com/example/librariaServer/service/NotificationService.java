package com.example.librariaServer.service;

import com.example.librariaServer.model.NotificationModel;
import com.example.librariaServer.repository.NotificationRepository;
import com.sun.nio.sctp.Notification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NotificationService {


    @Autowired
    private NotificationRepository notificationRepository;


    public NotificationModel saveNotification(NotificationModel notification){
        return this.notificationRepository.save(notification);
    }
}
