package com.example.librariaServer.controller;

import com.example.librariaServer.bean.TestBean;
import com.example.librariaServer.model.ObjEdit;
import com.example.librariaServer.model.UserEntity;
import com.example.librariaServer.service.UserService;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1")
public class UserController {

    @Autowired
    private UserService userService;



    @RequestMapping(value = "/basicauth", method = RequestMethod.GET)
    public TestBean basicauth(@RequestHeader Map<String,String> headers){
        headers.forEach((key,value) ->{
            System.out.println("Header Name: "+key+" Header Value: "+value);
        });
        TestBean bean = new TestBean("Adem","adem123");
        return bean;

    }
    @GetMapping("/users")
    public List<UserEntity> getAllUser(){
        return this.userService.getAllUsers();
    }

    @GetMapping("/user/{username}")
    public Optional<UserEntity> getUser(@PathVariable("username") String username){
        return Optional.ofNullable(userService.userByUsername(username));
    }
    @GetMapping("/user/findByid/{id}")
    public Optional<UserEntity> getUserById(@PathVariable("id") String id){
        return userService.userById(id);
    }

    @PutMapping("/user/friends/addfriend/{id}")
    public UserEntity addFriendToList(@PathVariable("id") String id, @RequestBody UserEntity friend){
        return userService.appendFriend(id,friend);
    }

    @PostMapping("/user/sendRequest/{receiver}/{sender}")
    public UserEntity sendRequest(@PathVariable("sender") String receiver, @PathVariable("receiver") String sender){
        System.out.println("-----:::::-----" + receiver + ":" + sender);
        return  userService.addToPendingFriends(receiver,sender);
    }

    @PostMapping("/user/unsendRequest/{receiver}/{sender}")
    public UserEntity unsendRequest(@PathVariable("sender") String sender, @PathVariable("receiver") String receiver){
        System.out.println("-----Unsend:::::-----" + receiver + ":" + sender);
        return  userService.unsendToPendingFriends(sender,receiver);
    }

    @PutMapping("/user/friendrequest/accept/{accepter}/{receiver}")
    public UserEntity acceptFriendRequest(@PathVariable("accepter") String accepter,@PathVariable("receiver") String receiver)
    {
        System.out.println("----Contorller : " + accepter + " == " + receiver);
        return userService.friendRequestAccepted(accepter,receiver);
    }

    @PostMapping("/user/friendrequest/notaccept/{accepter}/{receiver}")
    public UserEntity notacceptFriendRequest(@PathVariable("accepter") String accepter,@PathVariable("receiver") String receiver)
    {
        return userService.friendRequestNotAccepted(accepter,receiver);
    }

    @PostMapping("/user/updatenotification/setasread/{username}")
    public UserEntity updatenotificationsetasread(@PathVariable("username") String username){
        return userService.updatenotificationSetasread(username);
    }

    @PostMapping("/save")
    public void saveUser(@RequestBody UserEntity user){

        userService.saveUser(user);
    }



    @PutMapping("/user/updateProfile/{usertochange}")
    public UserEntity updateProfile(@PathVariable("usertochange") String usertochange, @RequestBody ObjEdit obj){
        return userService.updateUserProfile(usertochange,obj);
    }

    public class Obj{
        String obj_receiver;
        String obj_sender;


    }


}



