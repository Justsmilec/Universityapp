package com.example.librariaServer.service;

import com.example.librariaServer.model.Subject;
import com.example.librariaServer.model.SubjectPostModel;
import com.example.librariaServer.model.UserEntity;
import com.example.librariaServer.repository.DegeRepository;
import com.example.librariaServer.repository.SubjectRepository;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SubjectService {

    @Autowired
    private SubjectRepository subjectRepository;
    @Autowired
    private DegeService degeService;

    public List<Subject> getSubjects(){
        return subjectRepository.findAll();
    }


    public Subject saveSubject(Subject subject){
        if(degeService.ifExistDege(subject.getDega().getId())){
            subjectRepository.save(subject);
            System.out.println("----::: po po : "+ subject.getDega());
            degeService.updateDegeWithSubject(subject);

            return subject;

        }
        return null;
    }

    public List<Subject> subjectsOfDege(String degeId){
        return subjectRepository.findAll().stream().filter(s -> s.getDega().getId().equals(degeId)).collect(Collectors.toList());
    }

    public Subject getSubject(String id){
        return subjectRepository.findById(id).stream().findFirst().get();
    }


    public void addStudentToSubjectsOfDege(String id,UserEntity user){
        List<Subject> listOfSubjects = subjectsOfDege(id);
        for(int i = 0;i<listOfSubjects.size();i++){


            Subject subj = listOfSubjects.get(i);
            if(subj.getSemester() == user.getActualSemester())
            {
                List<UserEntity> listofUsers = subj.getStudents();
                listofUsers.add(user);
                subj.setStudents(listofUsers);
                subjectRepository.save(subj);
            }

        }

    }

    public Subject addStudentToSubject(String subject_id,String user){
        Subject subject = subjectRepository.findById(subject_id).stream().findAny().get();
        List<UserEntity> listOfStudents = subject.getStudents();
        UserEntity userObj= new UserEntity();
        userObj.setUsername(user);

            listOfStudents.add(userObj);
            subject.setStudents(listOfStudents);
            return subjectRepository.save(subject);


    }

    public Subject dropStudentToSubject(String subject_id,String user){
        Subject subject = subjectRepository.findById(subject_id).stream().findAny().get();
        List<UserEntity> listOfStudents = subject.getStudents();
        listOfStudents = listOfStudents.stream().filter(obj -> !obj.getUsername().equals(user)).collect(Collectors.toList());
        subject.setStudents(listOfStudents);
        return subjectRepository.save(subject);


    }



    public void updatesubjectUsers(String usertoChange,String newuser){
        List<Subject> allposts = subjectRepository.findAll();
        for(int i = 0;i<allposts.size();i++){
            Subject newelement = allposts.get(i);


            for(int j = 0;j<newelement.getStudents().size();j++) {
                if(newelement.getStudents().get(j).getUsername().equals(usertoChange))
                {
                    newelement.getStudents().get(j).setUsername(newuser);
                }
            }



//            for(int j = 0;j<newelement.getComments().size();j++) {
//                if(newelement.getComments().get(j).getUserWholiked().equals(usertoChange))
//                {
//                    newelement.getLikes().get(j).setUserWholiked(newuser);
//                }
//            }

            allposts.set(i,newelement);
            subjectRepository.save(allposts.get(i));

        }
    }

}
