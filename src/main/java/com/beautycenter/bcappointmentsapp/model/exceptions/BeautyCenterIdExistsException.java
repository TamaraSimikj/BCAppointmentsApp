package com.beautycenter.bcappointmentsapp.model.exceptions;

public class BeautyCenterIdExistsException extends RuntimeException{

    public BeautyCenterIdExistsException(String message){
        super(message);
    }
    public BeautyCenterIdExistsException(){}
}
