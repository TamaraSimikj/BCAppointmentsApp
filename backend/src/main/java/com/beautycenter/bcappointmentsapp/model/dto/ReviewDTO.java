package com.beautycenter.bcappointmentsapp.model.dto;

import com.beautycenter.bcappointmentsapp.model.Appointment;
import com.beautycenter.bcappointmentsapp.model.Client;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.time.LocalDateTime;

@Data
public class ReviewDTO {


    private String comment;

    private Integer rating;

    private String date_time;

    private Client client;

    private Appointment appointment;
}
