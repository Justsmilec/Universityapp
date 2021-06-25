package com.example.librariaServer.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@Document(collection = "Faculty")
public class Faculty {

    @Id
    private String id;
    private String name;
    private University university;
    private String mapURL;
    private List<Dege> deget;

    public Faculty() {
    }

    public Faculty(String name, University university,String mapURL, List<Dege> deget) {
        this.name = name;
        this.university = university;
        this.mapURL = mapURL;
        this.deget = deget;
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

    public University getUniversity() {
        return university;
    }

    public void setUniversity(University university) {
        this.university = university;
    }

    public String getMapURL() {
        return mapURL;
    }

    public void setMapURL(String mapURL) {
        this.mapURL = mapURL;
    }

    public List<Dege> getDeget() {
        return deget;
    }

    public void setDeget(List<Dege> deget) {
        this.deget = deget;
    }
}
