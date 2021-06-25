package com.example.librariaServer.service;


import com.example.librariaServer.model.CommentModel;
import com.example.librariaServer.model.LikeModel;
import com.example.librariaServer.model.ReplyModel;
import com.example.librariaServer.model.SubjectPostModel;
import com.example.librariaServer.repository.SubjectPostRepositroy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SubjectPostService {

    @Autowired
    private SubjectPostRepositroy subjectPostRepositroy;


    public List<SubjectPostModel> getAllPosts(){
        return this.subjectPostRepositroy.findAll();
    }

    public List<SubjectPostModel> get(String subject_id){

        return subjectPostRepositroy.findBySubjectId(subject_id);
    }
    public SubjectPostModel getbyId(String id){

        return subjectPostRepositroy.findById(id).stream().findAny().get();
    }

    public SubjectPostModel save(SubjectPostModel subjectpostmodel){
        return subjectPostRepositroy.save(subjectpostmodel);
    }

    public SubjectPostModel appendSubjectPostComment(String postid, CommentModel commnet) {
        SubjectPostModel post = subjectPostRepositroy.findById(postid).stream().findAny().get();
        List<CommentModel> comments = post.getComments();
        comments.add(commnet);
        post.setComments(comments);
        return subjectPostRepositroy.save(post);
    }

//    public boolean isCommentIdFound(String commentId,List<CommentModel> comments){
//
//    }

//    public int Found(List<ReplyModel> comments, String commentId) {
//        for(int i = 0;i<comments.size();i++){
//            return Found(comments.get(i).getReply(),commentId);
//            if (comments.get(i).getReplies().size() != 0) {
//                if(comment.getCommentId() == commentId)
//                    return 1;
//                else
//                    return Found;
//            } else {
//                return 0;
//            }
//        }
//
//    }
    public SubjectPostModel appendReplyComment(String postid, String commentId, ReplyModel replymodel) {
        //System.out.println("---: "+ postid + " ---- : " + commentId +  " + "+ commnet);
        SubjectPostModel post = subjectPostRepositroy.findById(postid).stream().findAny().get();
        List<CommentModel> comments = post.getComments();
        for(int i = 0;i<comments.size();i++){
            //for(int j = 0;j<comments.get(i).getReplies().size();j++){
            System.out.println("--: commentId : "+ comments.get(i).getCommentId());
            System.out.println("--: checkcommentId : "+ commentId);

            if(comments.get(i).getCommentId().equals(commentId)){
                    System.out.println("-------::::::: ----------- po po eshte nje ");
                    List<ReplyModel> commentreplies = comments.get(i).getReplies();
                    commentreplies.add(replymodel);
                    comments.get(i).setReplies(commentreplies);
                    break;
            }
        }
        //comments.add(commnet);
        post.setComments(comments);
        return subjectPostRepositroy.save(post);

    }

    public List<SubjectPostModel> likePost(String postid,String user) {
        SubjectPostModel post = subjectPostRepositroy.findById(postid).stream().findAny().get();
        List<LikeModel> likes = post.getLikes();

        for(int i = 0;i<likes.size();i++) {
            if(likes.get(i).getUserWholiked().equals(user))
                return subjectPostRepositroy.findAll();
        }
        LikeModel likeModel = new LikeModel(user);
            likes.add(likeModel);
            post.setLikes(likes);
            subjectPostRepositroy.save(post);
         return subjectPostRepositroy.findAll();


    }

    public SubjectPostModel likesinglePost(String postid,String user) {
        SubjectPostModel post = subjectPostRepositroy.findById(postid).stream().findAny().get();
        List<LikeModel> likes = post.getLikes();

        for(int i = 0;i<likes.size();i++) {
            if(likes.get(i).getUserWholiked().equals(user))
                return post;
        }

        LikeModel likeModel = new LikeModel(user);
            likes.add(likeModel);
            post.setLikes(likes);
        return subjectPostRepositroy.save(post);
    }

    public SubjectPostModel _likeComment(String postid, String commId,String user) {
        SubjectPostModel post = subjectPostRepositroy.findById(postid).stream().findFirst().get();
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
        return subjectPostRepositroy.save(post);
    }
}
