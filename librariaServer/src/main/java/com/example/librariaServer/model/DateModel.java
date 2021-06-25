package com.example.librariaServer.model;

import java.sql.Time;

public class DateModel {

    private int dayOfWeek;
    private String time;

    public DateModel(int dayOfWeek, String time) {
        this.dayOfWeek = dayOfWeek;
        this.time = time;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public int getDayOfWeek() {
        return dayOfWeek;
    }

    public void setDayOfWeek(int dayOfWeek) {
        this.dayOfWeek = dayOfWeek;
    }
}
