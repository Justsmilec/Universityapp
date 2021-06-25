package com.example.librariaServer.model;

public class ObjEdit {

    public String newname;
    public String newurl;

    public ObjEdit() {
    }

    public ObjEdit(String newname, String newurl) {
        this.newname = newname;
        this.newurl = newurl;
    }

    public String getNewname() {
        return newname;
    }

    public void setNewname(String newname) {
        this.newname = newname;
    }

    public String getNewurl() {
        return newurl;
    }

    public void setNewurl(String newurl) {
        this.newurl = newurl;
    }
}
