package com.example.backend.impl.domain.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.domain.model.Product;
import com.example.backend.domain.repository.ProductRepository;
import com.example.backend.domain.service.ProductService;

@Service
public class ProductServiceImpl implements ProductService {

  @Autowired
  private ProductRepository productRepository;

  @Override
  public Product create(Product product) {
    return productRepository.save(product);
  }

  /**
   * Update a product
   * 
   * @throws Exception
   */
  @Override
  public Product update(Product product) throws Exception {
    Optional<Product> productOptional = productRepository.findById(product.getId());
    if (productOptional.isEmpty())
      throw new Exception();
    Product productToUpdate = productOptional.get();
    // Update only if field is not null
    if (product.getName() != null)
      productToUpdate.setName(product.getName());
    if (product.getDescription() != null)
      productToUpdate.setDescription(product.getDescription());
    if (product.getImageUrl() != null)
      productToUpdate.setImageUrl(product.getImageUrl());
    if (product.getPrice() != null)
      productToUpdate.setPrice(product.getPrice());
    if (product.getQuantity() != null)
      productToUpdate.setQuantity(product.getQuantity());
    return productRepository.save(productToUpdate);
  }

  /**
   * Restore a product
   */
  @Override
  public void restore(Long id) throws Exception {
    Optional<Product> productOptional = productRepository.findById(id);
    if (productOptional.isEmpty())
      throw new Exception();
    Product productToRestore = productOptional.get();
    productToRestore.setIsDeleted(false);
    productRepository.save(productToRestore);
  }

  /**
   * Delete a product
   */
  @Override
  public void delete(Long id) throws Exception {
    Optional<Product> productOptional = productRepository.findById(id);
    if (productOptional.isEmpty())
      throw new Exception();
    Product productToDelete = productOptional.get();
    productToDelete.setIsDeleted(true);
    productRepository.save(productToDelete);
  }

  /**
   * Set a product as available or not
   * 
   * @param id
   * @throws Exception
   */
  @Override
  public void setAvailable(Long id) throws Exception {
    Optional<Product> productOptional = productRepository.findById(id);
    if (productOptional.isEmpty())
      throw new Exception();
    Product productToUpdate = productOptional.get();
    productToUpdate.setIsAvailable(!productOptional.get().getIsAvailable());
    productRepository.save(productToUpdate);
  }

}
