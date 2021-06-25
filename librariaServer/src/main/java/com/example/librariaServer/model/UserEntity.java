package com.example.librariaServer.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@Document(collection = "User")
public class UserEntity {
    @Id
    private String id;
    private String name;
    private String username;
    private String email;
    private int age;
    private String password;
    private String profilePic;
    private int actualSemester;
    private String actualClass;
    private University university;
    private Faculty faculty;
    private List<UserEntity> friends;
    private List<String> pendingFriends;
    private List<Subject> minorSubjects;
    private List<NotificationModel> notifications;

    public UserEntity() {
    }

    public UserEntity(String name, String username, String email, int age, String password, String profilePic, int actualSemester, String actualClass, University university,Faculty faculty,List<UserEntity> friends,List<String> pendingFriends,List<Subject> minorSubjects,List<NotificationModel> notifications) {
        this.name = name;
        this.username = username;
        this.email = email;
        this.age = age;
        this.password = password;
        this.profilePic = profilePic;
        this.actualSemester = actualSemester;
        this.actualClass = actualClass;
        this.university = university;
        this.faculty = faculty;
        this.friends = friends;
        this.pendingFriends = pendingFriends;
        this.minorSubjects = minorSubjects;
        this.notifications = notifications;
    }

    public List<NotificationModel> getNotifications() {
        return notifications;
    }

    public void setNotifications(List<NotificationModel> notifications) {
        this.notifications = notifications;
    }

    public List<String> getPendingFriends() {
        return pendingFriends;
    }

    public void setPendingFriends(List<String> pendingFriends) {
        this.pendingFriends = pendingFriends;
    }

    public List<Subject> getMinorSubjects() {
        return minorSubjects;
    }

    public void setMinorSubjects(List<Subject> minorSubjects) {
        this.minorSubjects = minorSubjects;
    }

    public Faculty getFaculty() {
        return faculty;
    }

    public void setFaculty(Faculty faculty) {
        this.faculty = faculty;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getProfilePic() {
        return profilePic;
    }

    public void setProfilePic(String profilePic) {
        this.profilePic = profilePic;
    }

    public int getActualSemester() {
        return actualSemester;
    }

    public void setActualSemester(int actualSemester) {
        this.actualSemester = actualSemester;
    }

    public String getActualClass() {
        return actualClass;
    }

    public void setActualClass(String actualClass) {
        this.actualClass = actualClass;
    }

    public University getUniversity() {
        return university;
    }

    public void setUniversity(University university) {
        this.university = university;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String email) {
        this.password = email;
    }

    public List<UserEntity> getFriends() {
        return friends;
    }

    public void setFriends(List<UserEntity> friends) {
        this.friends = friends;
    }
}
