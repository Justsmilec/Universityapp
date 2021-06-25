package com.example.librariaServer.service;


import com.example.librariaServer.model.Dege;
import com.example.librariaServer.model.Faculty;
import com.example.librariaServer.model.Subject;
import com.example.librariaServer.model.University;
import com.example.librariaServer.modelDTO.FacultyDTO;
import com.example.librariaServer.modelDTO.UniversityDTO;
import com.example.librariaServer.repository.FacultyRepository;
import com.example.librariaServer.repository.SubjectRepository;
import com.example.librariaServer.repository.UniversityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class FacultyService {

    @Autowired
    private FacultyRepository facultyRepository;
    @Autowired
    private UniversityRepository universityRepository;
    @Autowired
    private UniversityService universityService;

    public List<Faculty> getFaculties(){
        return facultyRepository.findAll();
    }

    public Faculty getFacultyById(String id){
        return facultyRepository.findById(id).stream().findAny().get();
    }
    public Faculty saveFaculty(Faculty faculty){

        if(universityService.ifExistUniversity(faculty.getUniversity().getId())){
            facultyRepository.save(faculty);
            System.out.println("_____ : "+ faculty.getName());
            universityService.updateUniversityWithFaculty(faculty);
            return faculty;
        }
        return null;
    }


    public Faculty updateFacultyWithDege(Dege dege){
        Faculty faculty = facultyRepository.findById(dege.getFaculty().getId()).stream().findFirst().get();
        //degeRepository.save(dege);
        List<Dege> degeOfFaculty = faculty.getDeget();
        degeOfFaculty.add(dege);
        faculty.setDeget(degeOfFaculty);
        return facultyRepository.save(faculty);

    }

    public boolean ifExistFaculty(String id){
        if(facultyRepository.findById(id) != null)
            return true;
        return false;
    }

    public boolean ifExistUniversity(String id){
        if(universityRepository.findById(id) != null)
            return true;
        return false;
    }


    public List<Dege> getDegetFromFacultyId(String id)
    {
        return facultyRepository.findById(id).stream().findAny().get().getDeget();
    }




    ///
    public List<FacultyDTO> getAllFacultiesDTOs(){
        List<Faculty> list = facultyRepository.findAll();
        List<FacultyDTO> listDTO = new ArrayList<>();
        for (int i = 0;i< list.size();i++){
            FacultyDTO udto = new FacultyDTO(list.get(i).getId(),list.get(i).getName());
            listDTO.add(udto);
        }

        return listDTO;


    }

}
