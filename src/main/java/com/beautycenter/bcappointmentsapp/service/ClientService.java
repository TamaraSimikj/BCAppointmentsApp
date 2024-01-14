package com.beautycenter.bcappointmentsapp.service;

import com.beautycenter.bcappointmentsapp.model.Client;
import com.beautycenter.bcappointmentsapp.model.dto.ClientDTO;

import java.util.List;

public interface ClientService {
    List<Client> findAll();

    Client findbyId(Long id);

  //  Employee create(EmployeeDTO employeeDTO);

    Client update(Long id, ClientDTO clientDTO);

    void deleteById(Long id);
}
