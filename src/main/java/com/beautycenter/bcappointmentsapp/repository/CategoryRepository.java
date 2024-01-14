package com.beautycenter.bcappointmentsapp.repository;

import com.beautycenter.bcappointmentsapp.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
