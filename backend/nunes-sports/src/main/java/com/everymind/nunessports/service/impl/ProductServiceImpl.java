package com.everymind.nunessports.service.impl;

import com.everymind.nunessports.entity.Product;
import com.everymind.nunessports.exception.ProductNotFoundException;
import com.everymind.nunessports.repository.ProductRepository;
import com.everymind.nunessports.service.IProductService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class ProductServiceImpl implements IProductService {

    private final ProductRepository productRepository;

    @Override
    public Product create(Product product) {
        return productRepository.save(product);
    }

    @Override
    public Product find(UUID uuid) throws ProductNotFoundException {
        return verifyIfExists(uuid);
    }

    @Override
    public List<Product> list() {
        return productRepository.findAll();
    }

    @Override
    public Product update(UUID uuid, Product product) throws ProductNotFoundException {
        Product productFound = verifyIfExists(uuid);
        productFound.setName(product.getName());
        productFound.setDescription(product.getDescription());
        productFound.setPrice(product.getPrice());
        productFound.setCode(product.getCode());
        return productRepository.save(productFound);
    }

    @Override
    public void delete(UUID uuid) throws ProductNotFoundException {
        verifyIfExists(uuid);
        productRepository.deleteById(uuid);
    }

    private Product verifyIfExists(UUID uuid) throws ProductNotFoundException {
        return productRepository.findById(uuid).orElseThrow(() -> new ProductNotFoundException(uuid));
    }
}
