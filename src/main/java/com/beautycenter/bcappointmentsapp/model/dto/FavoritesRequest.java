package com.beautycenter.bcappointmentsapp.model.dto;

import com.beautycenter.bcappointmentsapp.model.Client;
import com.beautycenter.bcappointmentsapp.model.Salon;
import lombok.Data;

@Data
public class FavoritesRequest {
    private Client client;
    private Salon salon;
}
