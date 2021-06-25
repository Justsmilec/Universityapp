package com.example.librariaServer.model;

public class ReplyModel {

    private CommentModel reply;

    public ReplyModel() {
    }

    public ReplyModel(CommentModel reply) {
        this.reply = reply;
    }

    public CommentModel getReply() {
        return reply;
    }

    public void setReply(CommentModel reply) {
        this.reply = reply;
    }
}
