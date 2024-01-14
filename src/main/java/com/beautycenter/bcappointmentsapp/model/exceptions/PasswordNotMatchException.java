package com.beautycenter.bcappointmentsapp.model.exceptions;

public class PasswordNotMatchException extends RuntimeException{
    public PasswordNotMatchException() {
        super("Passwords not match!");
    }
}
