package com.example.librariaServer.controller;

import com.example.librariaServer.model.Faculty;
import com.example.librariaServer.model.University;
import com.example.librariaServer.modelDTO.FacultyDTO;
import com.example.librariaServer.modelDTO.UniversityDTO;
import com.example.librariaServer.service.FacultyService;
import com.example.librariaServer.service.UniversityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1")
public class UniversityController {


    @Autowired
    private UniversityService universityService;;


    @GetMapping("/university/getall")
    public List<University> getUniversities(){
       return universityService.getUniversities();
    }
    @GetMapping("/university/get/{id}")
    public University getUniversity(@PathVariable("id") String id){
        return universityService.getUniversity(id);
    }

    @GetMapping("/university/univfaculties/{id}")
    public List<Faculty> getFaculties(@PathVariable("id") String id){
        return universityService.getFaculties(id);
    }

    @PostMapping("/university/save")
    public University saveUniversity(@RequestBody University university){
        return universityService.saveUniversity(university);

    }

    @GetMapping("/university/dto")
    public List<UniversityDTO> listofUniversitiesDTO(){
       return universityService.getAllUniversityDTOs();
    }

    @GetMapping("/faculty/university/getfacultydto/{id}")
    public List<FacultyDTO> getfacultyDTO(@PathVariable("id") String id){
            return universityService.getAllFacultiesDTOsFromUnivId(id);
    }

}
