package com.example.librariaServer.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@Document(collection = "University")
public class University {
    @Id
    private String id;
    private String name;
    private String mapURL;
    private String location;
    private List<Faculty> faculties;

    public University() {
    }

    public University(String name, String mapURL,String location, List<Faculty> faculties) {
        this.name = name;
        this.mapURL = mapURL;
        this.location = location;
        this.faculties = faculties;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
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

    public String getMapURL() {
        return mapURL;
    }

    public void setMapURL(String mapURL) {
        this.mapURL = mapURL;
    }

    public List<Faculty> getFaculties() {
        return faculties;
    }

    public void setFaculties(List<Faculty> faculties) {
        this.faculties = faculties;
    }
}
