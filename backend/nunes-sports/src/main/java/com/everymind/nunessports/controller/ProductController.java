package com.everymind.nunessports.controller;

import com.everymind.nunessports.entity.Product;
import com.everymind.nunessports.exception.CodeAlreadyExistsException;
import com.everymind.nunessports.exception.ProductNotFoundException;
import com.everymind.nunessports.service.impl.ProductServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/products")
public class ProductController {

    @Autowired
    private ProductServiceImpl productService;

    @PostMapping
    public Product create(@RequestBody Product product) throws CodeAlreadyExistsException {
        return productService.create(product);
    }

    @GetMapping("/{uuid}")
    public Product findById(@PathVariable UUID uuid) throws ProductNotFoundException {
        return productService.find(uuid);
    }

    @GetMapping
    public List<Product> list() {
        return productService.list();
    }

    @PatchMapping("/{uuid}")
    public Product update(@PathVariable UUID uuid, @RequestBody Product product) throws ProductNotFoundException {
        return productService.update(uuid, product);
    }

    @DeleteMapping("/{uuid}")
    public void delete(@PathVariable UUID uuid) throws ProductNotFoundException {
        productService.delete(uuid);
    }

}
