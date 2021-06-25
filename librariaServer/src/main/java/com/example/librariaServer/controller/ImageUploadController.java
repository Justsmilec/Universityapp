package com.example.librariaServer.controller;

import com.example.librariaServer.model.ImageModel;
import com.example.librariaServer.repository.ImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.ResponseEntity.BodyBuilder;
import org.springframework.web.bind.annotation.ModelAttribute;


import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Optional;
import java.util.zip.DataFormatException;
import java.util.zip.Deflater;
import java.util.zip.Inflater;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/v1")

public class ImageUploadController {

    @Autowired
    private ImageRepository imageRepository;

    @RequestMapping(value="/upload", method = RequestMethod.POST)
    public String uplaodImage(@RequestBody ImageModel imageFile) throws IOException {
        System.out.println("------------------------------------------------------*************************");

        System.out.println(imageFile);
        System.out.println(imageFile.getName());
        System.out.println(imageFile.getUrl());
       ImageModel img = new ImageModel(imageFile.getName(), imageFile.getUrl());
//
//        System.out.println("KETUUU" + img);
        imageRepository.save(img);
//        System.out.println("ktu vjen ");

return "Adem";
    }



}
