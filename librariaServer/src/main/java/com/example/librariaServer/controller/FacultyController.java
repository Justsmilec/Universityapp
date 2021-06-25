package com.example.librariaServer.controller;

import com.example.librariaServer.model.Dege;
import com.example.librariaServer.model.Faculty;
import com.example.librariaServer.modelDTO.FacultyDTO;
import com.example.librariaServer.modelDTO.UniversityDTO;
import com.example.librariaServer.service.FacultyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1")
public class FacultyController {


    @Autowired
    private FacultyService facultyService;

@GetMapping("faculty/getall")
    public List<Faculty> getAll(){

        return facultyService.getFaculties();
    }

    @GetMapping("/faculty/getFaculty/{id}")
    public Faculty getFacultyById(@PathVariable("id")String id){
        return facultyService.getFacultyById(id);
    }

    @GetMapping("faculty/deget/{id}")
    public List<Dege> getDegetFromFacultyId(@PathVariable("id") String id){
        return facultyService.getDegetFromFacultyId(id);

    }
    @PostMapping("/faculty/save")
    public Faculty saveFaculty(@RequestBody Faculty faculty){
        if(facultyService.ifExistUniversity(faculty.getUniversity().getId()))
            return facultyService.saveFaculty(faculty);
        return null;

    }

    @GetMapping("/faculty/dto")
    public List<FacultyDTO> listoffacultiesDTO(){
        return facultyService.getAllFacultiesDTOs();
    }

}
