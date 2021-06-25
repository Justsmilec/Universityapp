package com.example.librariaServer.model;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.stereotype.Component;
import java.util.List;

@Component
@Document(collection = "Dege")
public class Dege {


    @Id
    private String id;
    private String name;
    private List<Subject> subjects;
    private List<UserEntity> students;
    private Faculty faculty;

    public Dege() {
    }

    public Dege( String name, List<Subject> subjects, List<UserEntity> students, Faculty faculty) {

        this.name = name;
        this.subjects = subjects;
        this.students = students;
        this.faculty = faculty;
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

    public List<Subject> getSubjects() {
        return subjects;
    }

    public void setSubjects(List<Subject> subjects) {
        this.subjects = subjects;
    }

    public List<UserEntity> getStudents() {
        return students;
    }

    public void setStudents(List<UserEntity> students) {
        this.students = students;
    }

    public Faculty getFaculty() {
        return faculty;
    }

    public void setFaculty(Faculty faculty) {
        this.faculty = faculty;
    }
}
