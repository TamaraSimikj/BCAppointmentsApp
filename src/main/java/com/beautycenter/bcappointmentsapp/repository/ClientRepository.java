package com.beautycenter.bcappointmentsapp.repository;

import com.beautycenter.bcappointmentsapp.model.Client;
import com.beautycenter.bcappointmentsapp.model.Salon;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;


public interface ClientRepository extends JpaRepository<Client, Long> {


}
