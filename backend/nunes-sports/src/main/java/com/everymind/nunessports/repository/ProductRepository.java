package com.everymind.nunessports.repository;

import com.everymind.nunessports.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface ProductRepository extends JpaRepository<Product, UUID> {

    public Optional<Product> findByCode(String code);
}
