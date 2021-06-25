package com.example.librariaServer.controller;

import com.example.librariaServer.model.Dege;
import com.example.librariaServer.model.Faculty;
import com.example.librariaServer.service.DegeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1")
public class DegeController {


    @Autowired
    private DegeService degeService;

    @GetMapping("dege/getall")
    public List<Dege> allDeget(){
        return degeService.getDeget();
    }

    @GetMapping("dege/getdega/{id}")
    public Dege getSingleDege(@PathVariable("id") String id){
        return degeService.getSingleDege(id);
    }
    @PostMapping("/dege/save")
    public Dege saveDege(@RequestBody Dege dege){
        if(degeService.ifExistFaculty(dege.getFaculty().getId()))
            return degeService.saveDege(dege);
        return null;

    }


}
