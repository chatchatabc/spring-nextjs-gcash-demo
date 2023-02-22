package com.example.backend.domain.service;

import org.springframework.stereotype.Service;

import com.example.backend.domain.model.Product;

@Service
public interface ProductService {

  /**
   * Create a product
   * 
   * @param product
   */
  Product create(Product product);

  /**
   * Update a product
   * 
   * @param product
   * @throws Exception
   */
  Product update(Product product) throws Exception;

  /**
   * Restore a product
   * 
   * @param id
   * @throws Exception
   */
  void restore(Long id) throws Exception;

  /**
   * Delete a product
   * 
   * @param id
   * @throws Exception
   */
  void delete(Long id) throws Exception;

  /**
   * Set availability status of a product
   * 
   * @param id
   * @throws Exception
   */
  void setAvailable(Long id) throws Exception;

}
