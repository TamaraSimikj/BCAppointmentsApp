package com.beautycenter.bcappointmentsapp.service.impl;


import com.beautycenter.bcappointmentsapp.model.Client;
import com.beautycenter.bcappointmentsapp.model.dto.ClientDTO;
import com.beautycenter.bcappointmentsapp.model.exceptions.NotFoundException;
import com.beautycenter.bcappointmentsapp.repository.ClientRepository;
import com.beautycenter.bcappointmentsapp.service.ClientService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClientServiceImpl implements ClientService {

    private final ClientRepository clientRepository;

    public ClientServiceImpl(ClientRepository clientRepository) {
        this.clientRepository = clientRepository;
    }

    @Override
    public List<Client> findAll() {
        return this.clientRepository.findAll();
    }

    @Override
    public Client findbyId(Long id) {
        return this.clientRepository.findById(id).orElseThrow(NotFoundException::new);
    }

    @Override
    public Client update(Long id, ClientDTO clientDTO) {
        Client client = this.findbyId(id);
        client.setName(clientDTO.getName());
        client.setSurname(clientDTO.getSurname());
        client.setEmail(clientDTO.getEmail());
        client.setPhoneNumber(clientDTO.getPhoneNumber());
        client.setLoyaltyClub(clientDTO.getLoyaltyClub());

        return this.clientRepository.save(client);
    }

    @Override
    public void deleteById(Long id) {
        this.clientRepository.deleteById(id);
    }
}
