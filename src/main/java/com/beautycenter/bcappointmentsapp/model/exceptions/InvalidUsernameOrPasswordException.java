package com.beautycenter.bcappointmentsapp.model.exceptions;

public class InvalidUsernameOrPasswordException extends RuntimeException{

    public InvalidUsernameOrPasswordException() {
        super("Invalid username or password!");
    }
}