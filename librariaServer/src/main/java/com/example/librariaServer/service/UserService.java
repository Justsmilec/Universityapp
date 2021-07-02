package com.example.librariaServer.service;


import com.example.librariaServer.controller.UserController;
import com.example.librariaServer.model.*;
import com.example.librariaServer.repository.UserRepository;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private SubjectService subjectService;
    @Autowired
    private DegeService degeService;
    @Autowired
    private UserPostService userPostService;
    @Autowired
    private SubjectPostService subjectPostService;
//    @Autowired
//    private PasswordEncoder passwordEncoder;

    public List<UserEntity> getAllUsers(){
        return userRepository.findAll();
    }
    public String saveUser(UserEntity user){
        //user.setPassword(passwordEncoder.encode(user.getPassword()));


        UserEntity encryptedUser = new UserEntity(
                user.getName(),
                user.getUsername(),
                user.getEmail(),
                user.getAge(),
                this.passwordEncoder.encode(user.getPassword()),
                user.getProfilePic(),
                user.getActualSemester(),
                user.getActualClass(),
                user.getUniversity(),
                user.getFaculty(),
                new ArrayList<UserEntity>(),
                new ArrayList<String>(),
                user.getMinorSubjects(),
                new ArrayList<NotificationModel>()
            );

        userRepository.save(encryptedUser);

        degeService.appendUsertoDege(user);
       subjectService.addStudentToSubjectsOfDege(user.getActualClass(),user);
        //Mbasi te shtohet useri, shtoje userin te dega aktuale
        return "Saved";
    }


    /*
    Add friend on user list

     */

    public UserEntity appendFriend(String id,UserEntity friend) {
        UserEntity user = userRepository.findById(id).stream().findFirst().get();
        List<UserEntity> friends = user.getFriends();
        friends.add(friend);
        user.setFriends(friends);
        userRepository.save(user);
        return user;
    }

    public UserEntity appendFriend(String accepter,String receiver) {
        UserEntity userAccepter = userRepository.findByUsername(accepter);
        UserEntity userReceiver = userRepository.findByUsername(receiver);
        System.out.println("--- here you are on appendFriend");
        List<UserEntity> friends = userAccepter.getFriends();
        friends.add(userReceiver);
        userAccepter.setFriends(friends);
        userRepository.save(userAccepter);
        return userAccepter;
    }
    //Return userby Username
    public UserEntity userByUsername(String username){
        return userRepository.findByUsername(username);
    }
    public Optional<UserEntity> userById(String id){
        return userRepository.findById(id).stream().findFirst();
    }


    public University createUniversity(String name){
        return new University(name,"mapURL","",null);
    }


    //Sent follow Request and add to pendingRequest waiting to accept
    public UserEntity addToPendingFriends(String whoacceptRequestUsername,String whosendRequestUsername){
        UserEntity sender = userRepository.findByUsername(whosendRequestUsername);
        List<String> pendingList = sender.getPendingFriends();
        pendingList.add(whoacceptRequestUsername);
        sender.setPendingFriends(pendingList);
        appendfriendrequestnotification(whoacceptRequestUsername,whosendRequestUsername);
        return userRepository.save(sender);

    }

    //unsend
    public UserEntity unsendToPendingFriends(String whosendRequestUsername,String whoacceptRequestUsername){
        UserEntity receiver = userRepository.findByUsername(whoacceptRequestUsername);
        List<String> pendingList = receiver.getPendingFriends();
        pendingList.remove(whosendRequestUsername);
        receiver.setPendingFriends(pendingList);

        return userRepository.save(receiver);

    }


    //Append notification to user notification listl
    public UserEntity appendfriendrequestnotification(String username,String sender){
        System.out.println("0000000---: "+ username + " --- " + sender);
        FriendRequestNotification friendRequestNotification = new FriendRequestNotification(sender,"unread");
        NotificationModel notification = new NotificationModel(null,friendRequestNotification,null,"unread",new Date());
        UserEntity user = userRepository.findByUsername(username);
        System.out.println("-::: -- ::: "+ user.getUsername());
        List<NotificationModel> notificationList = user.getNotifications();
        notificationList.add(notification);
        user.setNotifications(notificationList);
        return userRepository.save(user);
    }

    //remove notification from user
    public UserEntity popfriendrequestnotification(String username,String sender,NotificationModel notification){
        System.out.println("0000000---: "+ username + " --- " + sender);
        //FriendRequestNotification friendRequestNotification = new FriendRequestNotification(sender,"unread");
        //NotificationModel notification = new NotificationModel(null,friendRequestNotification,null,"unread",new Date());
        UserEntity user = userRepository.findByUsername(username);
        System.out.println("-::: -- ::: "+ user.getUsername());
        List<NotificationModel> notificationList = user.getNotifications();
        notificationList.remove(notification);
        user.setNotifications(notificationList);
        return userRepository.save(user);
    }


    public UserEntity appendfriendrequestacceptednotification(String usernamewhoaccepted,String receiver){
        RequestAcceptedNotificationModel requestAcceptedNotificationModel = new RequestAcceptedNotificationModel(usernamewhoaccepted,"unread");
        NotificationModel notification = new NotificationModel(null,null,requestAcceptedNotificationModel,"unread",new Date());
        UserEntity user = userRepository.findByUsername(receiver);
        System.out.println("-::: -- ::: "+ user.getUsername());
        List<NotificationModel> notificationList = user.getNotifications();
        notificationList.add(notification);
        user.setNotifications(notificationList);
        return userRepository.save(user);
    }

    public UserEntity friendRequestAccepted(String usernamewhoaccepted,String receiver){
        //shto notification te useri qe dergoi kerkesen ne fillim
        makeusers_as_friends(usernamewhoaccepted,receiver);
        unsendToPendingFriends(usernamewhoaccepted,receiver);
        return appendfriendrequestacceptednotification(receiver,usernamewhoaccepted);

    }

    public UserEntity friendRequestNotAccepted(String usernamewhoaccepted,String receiver){
        //shto notification te useri qe dergoi kerkesen ne fillim

        //return appendfriendrequestnotacceptednotification(usernamewhoaccepted,receiver);
        return unsendToPendingFriends(receiver,usernamewhoaccepted);
    }


    public void makeusers_as_friends(String usernamewhoaccepted,String receiver){
        appendFriend(usernamewhoaccepted,receiver);
        appendFriend(receiver,usernamewhoaccepted);
    }


    //update users notification set as read
    public UserEntity updatenotificationSetasread(String username) {
        UserEntity user = userRepository.findByUsername(username);
        List<NotificationModel> notifications = user.getNotifications();

        for(int i = 0;i<notifications.size();i++){
            notifications.get(i).setStatus("read");
        }

        user.setNotifications(notifications);
        return userRepository.save(user);
    }

    public UserEntity updateUserProfile(String usertochange, ObjEdit obj) {
        System.out.println("------------------");
        UserEntity usertoupdate = userRepository.findByUsername(usertochange);
        usertoupdate.setUsername(obj.newname);
        usertoupdate.setProfilePic(obj.newurl);


        this.updateUserPostDatabase(usertochange,obj.newname);
        this.subjectService.updatesubjectUsers(usertochange,obj.newname);
        //update users posts userUsername
        return userRepository.save(usertoupdate);
    }


    //Helper for updating userprofile
    public void updateUserPostDatabase(String usertochange,String newuser){
        this.userPostService.updateuserPost(usertochange,newuser);
        this.subjectPostService.updatesubjectPost(usertochange,newuser);
    }


    public List<Subject> returnUsersSubjects(String username){
        List<Subject> alllist = this.subjectService.getSubjects();
        List<Subject> mylist = new ArrayList<Subject>();
        for(int i = 0;i<alllist.size();i++){
            for(int j = 0;j<alllist.get(i).getStudents().size();j++)
                if(alllist.get(i).getStudents().get(j).getUsername().equals(username))
                {
                    mylist.add(alllist.get(i));
                    break;
                }
        }

        return mylist;
    }

}


