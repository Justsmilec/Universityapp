package com.example.librariaServer.service;

import com.example.librariaServer.model.Dege;
import com.example.librariaServer.model.Faculty;
import com.example.librariaServer.model.Subject;
import com.example.librariaServer.model.University;
import com.example.librariaServer.modelDTO.FacultyDTO;
import com.example.librariaServer.modelDTO.UniversityDTO;
import com.example.librariaServer.repository.SubjectRepository;
import com.example.librariaServer.repository.UniversityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UniversityService {

    @Autowired
    private UniversityRepository universityRepository;

    public List<University> getUniversities(){
        return universityRepository.findAll();
    }

    public University getUniversity(String id){
        return universityRepository.findById(id).stream().findAny().get();
    }

    public List<Faculty> getFaculties(String id){
        University univ =  universityRepository.findById(id).stream().findAny().get();
        return univ.getFaculties();
    }
    public University saveUniversity(University university){
        return universityRepository.save(university);
    }
    public boolean ifExistUniversity(String id){
        if(universityRepository.findById(id) != null)
            return true;
        return false;
    }
    public University updateUniversityWithFaculty(Faculty faculty){
        System.out.println("-------::::::   +  : " + faculty.getUniversity().getId());

        University university = universityRepository.findById(faculty.getUniversity().getId()).stream().findFirst().get();
        //degeRepository.save(dege);
        List<Faculty> facultyOfUniversity = university.getFaculties();
        facultyOfUniversity.add(faculty);
        university.setFaculties(facultyOfUniversity);
        return universityRepository.save(university);

    }

    //Return universityDTO for Signup
    public List<UniversityDTO> getAllUniversityDTOs(){
        List<University> list = universityRepository.findAll();
        List<UniversityDTO> listDTO = new ArrayList<>();
        for (int i = 0;i< list.size();i++){
            UniversityDTO udto = new UniversityDTO(list.get(i).getId(),list.get(i).getName());
            listDTO.add(udto);
        }

        return listDTO;


    }

    public List<FacultyDTO> getAllFacultiesDTOsFromUnivId(String id){
        List<Faculty> list = universityRepository.findById(id).stream().findAny().get().getFaculties();
        List<FacultyDTO> listDTO = new ArrayList<>();
        for (int i = 0;i< list.size();i++){
            FacultyDTO udto = new FacultyDTO(list.get(i).getId(),list.get(i).getName());
            listDTO.add(udto);
        }

        return listDTO;


    }
}
