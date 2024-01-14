package com.beautycenter.bcappointmentsapp.service.impl;

import com.beautycenter.bcappointmentsapp.model.Category;
import com.beautycenter.bcappointmentsapp.model.Salon;
import com.beautycenter.bcappointmentsapp.model.Service;
import com.beautycenter.bcappointmentsapp.model.dto.ServiceDTO;
import com.beautycenter.bcappointmentsapp.model.exceptions.NotFoundException;
import com.beautycenter.bcappointmentsapp.repository.ServiceRepository;
import com.beautycenter.bcappointmentsapp.service.CategoryService;
import com.beautycenter.bcappointmentsapp.service.SalonService;
import com.beautycenter.bcappointmentsapp.service.ServicesService;

import java.util.List;

@org.springframework.stereotype.Service
public class ServicesServiceImpl implements ServicesService {

    private final ServiceRepository serviceRepository;
    private final SalonService salonService;
    private final CategoryService categoryService;

    public ServicesServiceImpl(ServiceRepository serviceRepository, SalonService salonService, CategoryService categoryService) {
        this.serviceRepository = serviceRepository;
        this.salonService = salonService;
        this.categoryService = categoryService;
    }

    @Override
    public List<Service> findAll() {
        return this.serviceRepository.findAll();
    }

    @Override
    public Service findbyId(Long id) {
        return this.serviceRepository.findById(id).orElseThrow(NotFoundException::new);
    }

    @Override
    public List<Service> findbySalonId(Long id) {
        return this.serviceRepository.findAllBySalon_Id(id);
    }

    @Override
    public List<Service> findbyCategoryId(Long id) {
        return this.serviceRepository.findAllByCategory_Id(id);
    }

    @Override
    public Service create(ServiceDTO serviceDTO) {
        Salon salon = this.salonService.findbyId(serviceDTO.getSalon());
        Category category = this.categoryService.findbyId(serviceDTO.getCategory());
        Service service = new Service(serviceDTO.getName(),serviceDTO.getDescription(),serviceDTO.getValue(),
                salon, category);
        return this.serviceRepository.save(service);
    }

    @Override
    public Service update(Long id, ServiceDTO serviceDTO) {
        Service uService = this.findbyId(id);
        Salon salon = this.salonService.findbyId(serviceDTO.getSalon());
        Category category = this.categoryService.findbyId(serviceDTO.getCategory());
        uService.setName(serviceDTO.getName());
        uService.setDescription(serviceDTO.getDescription());
        uService.setValue(serviceDTO.getValue());
        uService.setSalon(salon);
        uService.setCategory(category);
        return this.serviceRepository.save(uService);
    }

    @Override
    public void delete(Long id) {
        this.serviceRepository.deleteById(id);
    }
}
