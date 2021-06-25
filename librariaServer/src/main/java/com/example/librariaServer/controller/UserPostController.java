package com.example.librariaServer.controller;

import com.example.librariaServer.model.CommentModel;
import com.example.librariaServer.model.ReplyModel;
import com.example.librariaServer.model.SubjectPostModel;
import com.example.librariaServer.model.UserPostModel;
import com.example.librariaServer.service.UserPostService;
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
public class UserPostController {


    @Autowired
    private UserPostService userPostService;

    @GetMapping("/users/posts/get")
    public List<UserPostModel> getAllUserPosts(){
        return userPostService.getAllUsersPost();
    }

    @GetMapping("/users/posts/get/user/{username}")
    public List<UserPostModel> getUsersPosts(@PathVariable("username") String username ){
        return userPostService._getUsersPost(username);
    }

    @PostMapping("/user/userpost/savepost")
    public UserPostModel saveUserPost(@RequestBody UserPostModel userPostModel){
        return this.userPostService.saveUserPost(userPostModel);
    }



    @MessageMapping("/like/userpost/{postid}/{user}/{actualUser}")
    @SendTo("/topic/appliances/getuserpost")
    public List<UserPostModel> getAllUsersPostsafterLiked(@DestinationVariable String postid, @DestinationVariable String user, @DestinationVariable String actualUser) {

        System.out.println(" -- : "+ postid  + " -- " + user + " --- " + actualUser);
        return userPostService.likePost(postid,user,actualUser);
    }
    @MessageMapping("/like/singleuserpost/{postid}/{user}/{actualUser}")
    @SendTo("/topic/appliances/getuserpostsingle")
    public UserPostModel getSingleSubjectPostsafterLiked(@DestinationVariable String postid,@DestinationVariable String user,@DestinationVariable String actualUser) {
        System.out.println("po po op oo p");
        return userPostService.likesinglePost(postid,user,actualUser);
    }

    @MessageMapping("/like/comment_user/{postid}/{commId}/{user}")
    @SendTo("/topic/appliances/getuserpostsingle")
    public UserPostModel likeComment(@DestinationVariable String postid,@DestinationVariable String commId,@DestinationVariable String user) {
        System.out.println("po po op oo p dhe ktu");
        return userPostService._likeComment(postid,commId,user);
    }


    @MessageMapping("/getsingleuserpost/{postid}")
    @SendTo("/topic/appliances/getuserpostsingle")
    public UserPostModel getUserpostDetails(@DestinationVariable String postid) {

        return userPostService.getById(postid);
    }


    @MessageMapping("/add/comment_user/{postid}")
    @SendTo("/topic/appliances/getuserpostsingle")
    public UserPostModel appendSubjectPostComment(@DestinationVariable String postid,@Payload CommentModel commnet) {

        System.out.println("----- po futet");
        return userPostService.appendUserPostComment(postid,commnet);
    }

    @MessageMapping("/add/comment_user/{postid}/{commentId}")
    @SendTo("/topic/appliances/getuserpostsingle")
    public UserPostModel appendReplyToComment(@DestinationVariable String postid,@DestinationVariable String commentId,@Payload ReplyModel replyModel) {

        System.out.println("----- po futet");
        return userPostService.appendReplyComment(postid,commentId,replyModel);
    }



    @MessageMapping("/user/add/post")
    @SendTo("/topic/appliances/getuserpostsingle")
    public UserPostModel addPostToUser(@Payload UserPostModel post) {

        System.out.println("------hahaha ");
        return userPostService._addPostToUser(post);
    }

}
