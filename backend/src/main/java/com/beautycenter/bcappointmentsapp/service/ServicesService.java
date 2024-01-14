package com.beautycenter.bcappointmentsapp.service;

import com.beautycenter.bcappointmentsapp.model.Service;
import com.beautycenter.bcappointmentsapp.model.dto.ServiceDTO;

import java.util.List;

public interface ServicesService {

    List<Service> findAll();

    Service findbyId(Long id);
    List<Service> findbySalonId(Long id);

    List<Service> findbyCategoryId(Long id);

    Service create(ServiceDTO serviceDTO);

    Service update(Long id, ServiceDTO updatedServiceDTO);
    void delete(Long id);
}
