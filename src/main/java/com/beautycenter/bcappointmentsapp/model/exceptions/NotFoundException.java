package com.beautycenter.bcappointmentsapp.model.exceptions;


public class NotFoundException extends RuntimeException {

    public NotFoundException() {
        super();
    }

    public NotFoundException(final String message) {
        super(message);
    }

}
