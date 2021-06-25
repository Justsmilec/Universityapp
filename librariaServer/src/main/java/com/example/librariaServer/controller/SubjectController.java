package com.example.librariaServer.controller;

import com.example.librariaServer.model.Subject;
import com.example.librariaServer.service.SubjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1")
public class SubjectController {

    @Autowired
    private SubjectService subjectService;

    @GetMapping("/subject/getall")
    public List<Subject> getAll(){
        return subjectService.getSubjects();
    }
    @GetMapping("/subject/dege/{degeId}")
    public List<Subject> subjectsOfDege(@PathVariable("degeId") String degeId) {
        return subjectService.subjectsOfDege(degeId);

    }
    @GetMapping("/subject/getsubject/{id}")
    public Subject getSubject(@PathVariable("id") String id){
        return subjectService.getSubject(id);
    }
    @PostMapping("/subject/save")
    public Subject save(@RequestBody Subject subject){
        return subjectService.saveSubject(subject);
    }


    @PostMapping("/subject/addStudentList/{subject_id}/{username}")
    public Subject addStudentToSubject(@PathVariable("subject_id") String subject_id,@PathVariable("username") String username){
        return subjectService.addStudentToSubject(subject_id,username);
    }


    @PostMapping("/subject/dropStudentList/{subject_id}/{username}")
    public Subject dropStudentToSubject(@PathVariable("subject_id") String subject_id,@PathVariable("username") String username){
        System.out.println("------::::::: ===== "+ subject_id + " " + username);
        return subjectService.dropStudentToSubject(subject_id,username);
    }

}
