package com.example.librariaServer.service;

import com.example.librariaServer.model.Dege;
import com.example.librariaServer.model.Subject;
import com.example.librariaServer.model.UserEntity;
import com.example.librariaServer.repository.DegeRepository;
import com.example.librariaServer.repository.SubjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DegeService {

    @Autowired
    private DegeRepository degeRepository;
    @Autowired
    private FacultyService facultyService;

    public List<Dege> getDeget(){
        return degeRepository.findAll();
    }

    public Dege getSingleDege(String id){
        return degeRepository.findById(id).stream().findAny().get();
    }
    public Dege saveDege(Dege dege){
        if(facultyService.ifExistFaculty(dege.getFaculty().getId())){
            degeRepository.save(dege);
            facultyService.updateFacultyWithDege(dege);
            return dege;
        }
        return null;
    }

    public boolean ifExistDege(String id){
        if(degeRepository.findById(id) != null)
            return true;
        return false;
    }

    public boolean ifExistFaculty(String id){
        if(facultyService.ifExistFaculty(id))
            return true;
        return false;
    }
    public Dege updateDegeWithSubject(Subject subject){
        Dege dege = degeRepository.findById(subject.getDega().getId()).stream().findAny().get();
        //degeRepository.save(dege);
        List<Subject> subjectsOfDege = dege.getSubjects();
        subjectsOfDege.add(subject);
        dege.setSubjects(subjectsOfDege);
        return degeRepository.save(dege);

    }

    public Dege appendUsertoDege(UserEntity user){
        Dege dege = degeRepository.findById(user.getActualClass()).stream().findAny().get();
        //degeRepository.save(dege);
        List<UserEntity> studnetsOfDege = dege.getStudents();
        studnetsOfDege.add(user);
        dege.setStudents(studnetsOfDege);
        return degeRepository.save(dege);
    }


    public List<Subject> getSubjectFromDegeId(String id){
        return degeRepository.findById(id).stream().findAny().get().getSubjects();
    }
//    public List<Subject> subjectsOfDege(String degeId){
//        List<Subject> subjects = degeRepository.findAll().stream().filter(s -> s.);
//    }
}
