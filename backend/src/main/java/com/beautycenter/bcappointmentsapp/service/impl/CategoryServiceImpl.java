package com.beautycenter.bcappointmentsapp.service.impl;

import com.beautycenter.bcappointmentsapp.model.Category;
import com.beautycenter.bcappointmentsapp.model.dto.CategoryDTO;
import com.beautycenter.bcappointmentsapp.repository.CategoryRepository;
import com.beautycenter.bcappointmentsapp.service.CategoryService;
import org.springframework.stereotype.Service;
import com.beautycenter.bcappointmentsapp.model.exceptions.NotFoundException;


import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {
    private final CategoryRepository categoryRepository;

    public CategoryServiceImpl(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public List<Category> findAll() {
       return this.categoryRepository.findAll();
    }

    @Override
    public Category findbyId(Long id) {
        return this.categoryRepository.findById(id).orElseThrow(NotFoundException::new);
    }

    @Override
    public Category create(CategoryDTO categoryDTO) {
        Category category = new Category(categoryDTO.getName(),categoryDTO.getDescription());
        return this.categoryRepository.save(category);
    }

    @Override
    public Category update(Long id, CategoryDTO categoryDTO) {
        Category categoryUpdate = this.findbyId(id);
        categoryUpdate.setName(categoryDTO.getName());
        categoryUpdate.setDescription(categoryDTO.getDescription());
        return this.categoryRepository.save(categoryUpdate);
    }

    @Override
    public void delete(Long id) {
        this.categoryRepository.deleteById(id);
    }
}
