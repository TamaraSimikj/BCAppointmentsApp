package com.beautycenter.bcappointmentsapp.service.impl;

import com.beautycenter.bcappointmentsapp.model.Appointment;
import com.beautycenter.bcappointmentsapp.model.dto.AppointmentDTO;
import com.beautycenter.bcappointmentsapp.model.enums.AppointmentStatus;
import com.beautycenter.bcappointmentsapp.model.exceptions.NotFoundException;
import com.beautycenter.bcappointmentsapp.repository.AppointmentRepository;
import com.beautycenter.bcappointmentsapp.service.AppointmentService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppointmentServiceImpl implements AppointmentService {
    private final AppointmentRepository appointmentRepository;

    public AppointmentServiceImpl(AppointmentRepository appointmentRepository) {
        this.appointmentRepository = appointmentRepository;
    }

    @Override
    public List<Appointment> listAll() {
        return this.appointmentRepository.findAll();
    }

    @Override
    public List<Appointment> listAllByClientId(Long id) {
//        return this.appointmentRepository.findAllByClient_Id(id);
        return this.appointmentRepository.findAllByClient_IdOrderByBookingTimeDesc(id);

    }

    @Override
    public List<Appointment> listAllBySalonId(Long id) {
//        return this.appointmentRepository.findAllBySalon_Id(id);
        return this.appointmentRepository.findAllBySalon_IdOrderByBookingTimeDesc(id);

    }

    @Override
    public Appointment findbyId(Long id) {
        return this.appointmentRepository.findById(id).orElseThrow(NotFoundException::new);
    }

    @Override
    public Appointment create(AppointmentDTO appointmentDTO) {
        Appointment newApp = new Appointment(appointmentDTO);
        return this.appointmentRepository.save(newApp);
    }

    @Override
    public Appointment update(Long id, AppointmentDTO appointmentDTO) {
        return null;
    }

    @Override
    public Appointment updateStatus(Long id, String status) {
        Appointment app = this.findbyId(id);
        app.setStatus(AppointmentStatus.valueOf(status));
        return this.appointmentRepository.save(app);
    }

//    @Override
//    public Appointment decline(Long id) {
//        Appointment app = this.findbyId(id);
//        app.setStatus(AppointmentStatus.DECLINED);
//        // da se oslobodi booking timot
//        return this.appointmentRepository.save(app);
//    }

    @Override
    public void delete(Long id) {
       this.appointmentRepository.deleteById(id);
    }
}
