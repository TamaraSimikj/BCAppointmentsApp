package com.beautycenter.bcappointmentsapp.repository;


import com.beautycenter.bcappointmentsapp.model.Service;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ServiceRepository extends JpaRepository<Service, Long> {

    List<Service> findAllBySalon_Id(Long id);

    List<Service> findAllByCategory_Id(Long id);
}
