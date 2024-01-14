package com.beautycenter.bcappointmentsapp.service;

import com.beautycenter.bcappointmentsapp.model.Category;
import com.beautycenter.bcappointmentsapp.model.dto.CategoryDTO;

import java.util.List;

public interface CategoryService {

    List<Category> findAll();
    Category findbyId(Long id);

    Category create(CategoryDTO categoryDTO);

    Category update(Long id, CategoryDTO categoryDTO);

    void delete(Long id);
}
