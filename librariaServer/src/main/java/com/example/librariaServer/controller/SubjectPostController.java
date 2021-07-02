package com.example.librariaServer.controller;


import com.example.librariaServer.model.CommentModel;
import com.example.librariaServer.model.ReplyModel;
import com.example.librariaServer.model.SubjectPostModel;
import com.example.librariaServer.service.SubjectPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1")
public class SubjectPostController {


    @Autowired
    private SubjectPostService subjectPostService;


    @GetMapping("/posts/subjects/get/{username}")
    public List<SubjectPostModel> getPosts(@PathVariable String username){
        return subjectPostService.getAllPosts(username);
    }

    @MessageMapping("/get/{username}")
    @SendTo("/topic/appliances/get")
    public List<SubjectPostModel> getAllSubjectPosts(@DestinationVariable String username) {

        return subjectPostService.getAllPosts(username);
    }

    @MessageMapping("/get/search/{username}/{searchtext}")
    @SendTo("/topic/appliances/get")
    public List<SubjectPostModel> getAllSubjectPostsSearch(@DestinationVariable String username, @DestinationVariable String searchtext) {

        return subjectPostService.getAllPosts(username);
    }

    @MessageMapping("/getsingle/{postid}")
    @SendTo("/topic/appliances/getsingle")
    public SubjectPostModel getSubjectPost(@DestinationVariable String postid) {

        return subjectPostService.getbyId(postid);
    }
    @PostMapping("/posts/subjects/save/{username}")
    public List<SubjectPostModel> savePost(@PathVariable String username,@RequestBody SubjectPostModel subjectpostmodel){
        subjectPostService.save(subjectpostmodel);
        return subjectPostService.getAllPosts(username);
    }

    @MessageMapping("/add/comment/{postid}")
    @SendTo("/topic/appliances/getsingle")
    public SubjectPostModel appendSubjectPostComment(@DestinationVariable String postid,@Payload CommentModel commnet) {

        System.out.println("----- po futet");
        return subjectPostService.appendSubjectPostComment(postid,commnet);
    }

    @MessageMapping("/add/comment/{postid}/{commentId}")
    @SendTo("/topic/appliances/getsingle")
    public SubjectPostModel appendReplyToComment(@DestinationVariable String postid,@DestinationVariable String commentId,@Payload ReplyModel replyModel) {

        System.out.println("----- po futet");
        return subjectPostService.appendReplyComment(postid,commentId,replyModel);
    }


    @MessageMapping("/like/post/{postid}/{user}")
    @SendTo("/topic/appliances/get")
    public List<SubjectPostModel> getAllSubjectPostsafterLiked(@DestinationVariable String postid,@DestinationVariable String user) {

        return subjectPostService.likePost(postid,user);
    }

    @MessageMapping("/like/singlepost/{postid}/{user}")
    @SendTo("/topic/appliances/getsingle")
    public SubjectPostModel getSingleSubjectPostsafterLiked(@DestinationVariable String postid,@DestinationVariable String user) {
        System.out.println("po po op oo p");
        return subjectPostService.likesinglePost(postid,user);
    }

    @MessageMapping("/like/comment/{postid}/{commId}/{user}")
    @SendTo("/topic/appliances/getsingle")
    public SubjectPostModel likeComment(@DestinationVariable String postid,@DestinationVariable String commId,@DestinationVariable String user) {
        System.out.println("po po op oo p dhe ktu");
        return subjectPostService._likeComment(postid,commId,user);
    }
}
