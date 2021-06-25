package com.example.librariaServer.model;

import org.springframework.data.annotation.Id;

import java.util.List;

public class CommentModel {

    @Id
    private String commentId;
    private String userwhocommented;
    private String comment;
    private List<LikeModel> likeonComment;
    private List<ReplyModel> replies;

    public CommentModel() {
    }

    public CommentModel(String commentId,String userwhocommented, String comment, List<LikeModel> likeonComment, List<ReplyModel> replies) {
        this.commentId = commentId;
        this.userwhocommented = userwhocommented;
        this.comment = comment;
        this.likeonComment = likeonComment;
        this.replies = replies;
    }

    public String getCommentId() {
        return commentId;
    }

    public void setCommentId(String commentId) {
        this.commentId = commentId;
    }

    public String getUserwhocommented() {
        return userwhocommented;
    }

    public void setUserwhocommented(String userwhocommented) {
        this.userwhocommented = userwhocommented;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public List<LikeModel> getLikeonComment() {
        return likeonComment;
    }

    public void setLikeonComment(List<LikeModel> likeonComment) {
        this.likeonComment = likeonComment;
    }

    public List<ReplyModel> getReplies() {
        return replies;
    }

    public void setReplies(List<ReplyModel> replies) {
        this.replies = replies;
    }
}
