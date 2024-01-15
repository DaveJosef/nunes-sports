package com.everymind.nunessports.service;

import com.everymind.nunessports.entity.Product;
import com.everymind.nunessports.exception.CodeAlreadyExistsException;
import com.everymind.nunessports.exception.ProductNotFoundException;

import java.util.List;
import java.util.UUID;

public interface IProductService {

    Product create(Product product) throws CodeAlreadyExistsException;

    Product find(UUID uuid) throws ProductNotFoundException;

    List<Product> list();

    Product update(UUID uuid, Product product) throws ProductNotFoundException;

    void delete(UUID uuid) throws ProductNotFoundException;

}
