package com.beautycenter.bcappointmentsapp.model.dto;

import com.beautycenter.bcappointmentsapp.model.Employee;
import lombok.Data;

@Data
public class BookingTimeRequest {
       Employee employee;
       String fromTime;
       String toTime;
       String fromTime1;
       String toTime1;
       Number slotsDuration;
       String dates;
}

