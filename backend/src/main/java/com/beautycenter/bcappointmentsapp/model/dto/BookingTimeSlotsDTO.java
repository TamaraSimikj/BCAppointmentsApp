package com.beautycenter.bcappointmentsapp.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalTime;

@Data
@AllArgsConstructor
public class BookingTimeSlotsDTO {
    private Long id;
    private LocalTime time;
    private Long employeeId;
}


