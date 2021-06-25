package com.example.librariaServer.bean;

public class TestBean {

    private String name;
    private String password;

    public TestBean() {
    }

    public TestBean(String name, String msg) {
        this.name = name;
        this.password = msg;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String msg) {
        this.password = msg;
    }
}
