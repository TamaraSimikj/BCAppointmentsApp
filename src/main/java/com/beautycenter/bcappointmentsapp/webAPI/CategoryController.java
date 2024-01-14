package com.beautycenter.bcappointmentsapp.webAPI;

import com.beautycenter.bcappointmentsapp.model.Category;
import com.beautycenter.bcappointmentsapp.model.dto.CategoryDTO;
import com.beautycenter.bcappointmentsapp.model.exceptions.ErrorResponse;
import com.beautycenter.bcappointmentsapp.service.CategoryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = "/api/categories")
public class CategoryController {

    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping
    public ResponseEntity<List<Category>> getAllCategories() {
        return ResponseEntity.ok(categoryService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Category> getCategory(@PathVariable final Long id) {
        return ResponseEntity.ok(categoryService.findbyId(id));
    }

    @PostMapping("/add")
    public ResponseEntity<?> createCategory(@RequestBody CategoryDTO categoryDTO) {
        try {
            Category category = categoryService.create(categoryDTO);

            return new ResponseEntity<>(category, HttpStatus.CREATED);
        } catch (Exception e) {
            ErrorResponse errorResponse = new ErrorResponse(e.getMessage());
            return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateCategory(@PathVariable final Long id,
            @RequestBody CategoryDTO categoryDTO) {
        try {
            return new ResponseEntity<>(categoryService.update(id, categoryDTO), HttpStatus.OK);
        } catch (Exception e) {
            ErrorResponse errorResponse = new ErrorResponse(e.getMessage());
            return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
        }

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable final Long id) {
        categoryService.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
