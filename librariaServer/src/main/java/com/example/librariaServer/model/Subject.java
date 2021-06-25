package com.example.librariaServer.model;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.List;

@Component
@Document(collection = "Subject")
public class Subject {

    @Id
    private String id;
    private String name;
    private String professor;
    private String credits;
    private int classRoomNumber;
    private List<UserEntity> students;
    private Dege dega;
    private int semester;
    private DateModel date;

    public Subject() {
    }

    public Subject(String name, String professor, String credits,int classRoomNumber, List<UserEntity> students, Dege dega,int semester,DateModel date) {
        this.name = name;
        this.professor = professor;
        this.credits = credits;
        this.classRoomNumber = classRoomNumber;
        this.students = students;
        this.dega = dega;
        this.semester = semester;
        this.date = date;
    }

    public DateModel getDate() {
        return date;
    }

    public void setDate(DateModel date) {
        this.date = date;
    }

    public int getSemester() {
        return semester;
    }

    public void setSemester(int semester) {
        this.semester = semester;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getProfessor() {
        return professor;
    }

    public void setProfessor(String professor) {
        this.professor = professor;
    }

    public String getCredits() {
        return credits;
    }

    public void setCredits(String credits) {
        this.credits = credits;
    }

    public int getClassRoomNumber() {
        return classRoomNumber;
    }

    public void setClassRoomNumber(int classRoomNumber) {
        this.classRoomNumber = classRoomNumber;
    }

    public List<UserEntity> getStudents() {
        return students;
    }

    public void setStudents(List<UserEntity> students) {
        this.students = students;
    }

    public Dege getDega() {
        return dega;
    }

    public void setDega(Dege dega) {
        this.dega = dega;
    }
}
