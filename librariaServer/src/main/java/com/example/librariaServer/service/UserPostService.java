package com.example.librariaServer.service;

import com.example.librariaServer.model.*;
import com.example.librariaServer.repository.UserPostRepository;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserPostService {

    @Autowired
    private UserPostRepository userPostRepository;



    public UserPostModel saveUserPost(UserPostModel userPostModel){
        return userPostRepository.save(userPostModel);
    }

    public List<UserPostModel> getAllUsersPost() {
        return userPostRepository.findAll();
    }

    public List<UserPostModel> _getUsersPost(String username) {
        return userPostRepository.findByUserUsername(username);
    }

    public List<UserPostModel> likePost(String postid, String user,String actualUser) {
        UserPostModel post = userPostRepository.findById(postid).stream().findAny().get();
        List<LikeModel> likes = post.getLikes();

        for(int i = 0;i<likes.size();i++) {
            if(likes.get(i).getUserWholiked().equals(user))
                return this._getUsersPost(actualUser);
        }
        LikeModel likeModel = new LikeModel(user);
        likes.add(likeModel);
        post.setLikes(likes);
        userPostRepository.save(post);
        System.out.println("--- ; " + this._getUsersPost(actualUser).size());
        return this._getUsersPost(actualUser);
    }
    public UserPostModel likesinglePost(String postid, String user, String actualUser) {
        UserPostModel post = userPostRepository.findById(postid).stream().findAny().get();
        List<LikeModel> likes = post.getLikes();

        for(int i = 0;i<likes.size();i++) {
            if(likes.get(i).getUserWholiked().equals(user))
                return post;
        }

        LikeModel likeModel = new LikeModel(user);
        likes.add(likeModel);
        post.setLikes(likes);
        return userPostRepository.save(post);
    }

    public UserPostModel getById(String postid) {
        System.out.println("Kjo eshte id : "+ postid);
        return this.userPostRepository.findById(postid).stream().findFirst().get();
    }


    public UserPostModel appendUserPostComment(String postid, CommentModel commnet) {
        System.out.println("hahaha : " + postid);
        UserPostModel post = userPostRepository.findById(postid).stream().findAny().get();
        List<CommentModel> comments = post.getComments();
        comments.add(commnet);
        post.setComments(comments);
        return userPostRepository.save(post);
    }

    public UserPostModel appendReplyComment(String postid, String commentId, ReplyModel replyModel) {

        System.out.println("---: "+ postid + " ---- : " + commentId);
        UserPostModel post = userPostRepository.findById(postid).stream().findAny().get();
        List<CommentModel> comments = post.getComments();
        for(int i = 0;i<comments.size();i++){
            //for(int j = 0;j<comments.get(i).getReplies().size();j++){
            System.out.println("--: commentId : "+ comments.get(i).getCommentId());
            System.out.println("--: checkcommentId : "+ commentId);

            if(comments.get(i).getCommentId().equals(commentId)){
                System.out.println("-------::::::: ----------- po po eshte nje ");
                List<ReplyModel> commentreplies = comments.get(i).getReplies();
                commentreplies.add(replyModel);
                comments.get(i).setReplies(commentreplies);
                break;
            }
        }
        //comments.add(commnet);
        post.setComments(comments);
        return userPostRepository.save(post);

    }

    public UserPostModel _likeComment(String postid, String commId, String user) {

        UserPostModel post = userPostRepository.findById(postid).stream().findFirst().get();
        List<CommentModel> commentModelList = post.getComments();
//        System.out.println("COM ID: "+ commId);
//        for(int i = 0;i<commentModelList.size();i++){
//            System.out.println("---: "+ commentModelList.get(i).getCommentId());
//        }
        CommentModel commentModel = commentModelList.stream().filter(obj -> obj.getCommentId().equals(commId)).findFirst().get();
        int index = commentModelList.indexOf(commentModel);
        List<LikeModel> likes = commentModel.getLikeonComment();
        for(int i = 0;i<likes.size();i++) {
            if(likes.get(i).getUserWholiked().equals(user))
                return post;
        }

        LikeModel likeModel = new LikeModel(user);
        likes.add(likeModel);
        commentModel.setLikeonComment(likes);
        commentModelList.set(index,commentModel);
        post.setComments(commentModelList);
        return userPostRepository.save(post);
    }

    public UserPostModel _addPostToUser(UserPostModel post) {
        return this.saveUserPost(post);
    }



    //Update userpost database
    public void updateuserPost(String usertoChange,String newuser){
        List<UserPostModel> allposts = userPostRepository.findAll();
        for(int i = 0;i<allposts.size();i++){
            UserPostModel newelement = allposts.get(i);
            if(allposts.get(i).getUserUsername().equals(usertoChange)){
                newelement.setUserUsername(newuser);

            }

            for(int j = 0;j<newelement.getLikes().size();j++) {
                if(newelement.getLikes().get(j).getUserWholiked().equals(usertoChange))
                {
                    newelement.getLikes().get(j).setUserWholiked(newuser);
                }
            }

            for(int j = 0;j<newelement.getComments().size();j++) {
                if(newelement.getComments().get(j).getUserWholiked().equals(usertoChange))
                {
                    newelement.getLikes().get(j).setUserWholiked(newuser);
                }
            }
        }
    }
}
