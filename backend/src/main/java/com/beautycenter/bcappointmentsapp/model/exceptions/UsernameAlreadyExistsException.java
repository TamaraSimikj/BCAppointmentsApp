package com.beautycenter.bcappointmentsapp.model.exceptions;

public class UsernameAlreadyExistsException extends RuntimeException{
    public UsernameAlreadyExistsException(String username) {
        super("Username " + username + " already exists!");
    }
}
