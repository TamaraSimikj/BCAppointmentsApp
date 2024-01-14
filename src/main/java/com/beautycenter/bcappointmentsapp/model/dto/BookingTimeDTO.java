package com.beautycenter.bcappointmentsapp.model.dto;

import lombok.Data;
import java.time.LocalDateTime;
import java.time.LocalTime;


@Data
public class BookingTimeDTO {

    LocalDateTime startTime;
    private LocalTime duration;
    Long employeeId;
}
