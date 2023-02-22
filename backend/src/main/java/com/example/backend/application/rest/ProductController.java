package com.example.backend.application.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.domain.model.Product;
import com.example.backend.domain.repository.ProductRepository;
import com.example.backend.domain.service.ProductService;

@RestController
@RequestMapping("/products")
public class ProductController {

  @Autowired
  private ProductService productService;

  @Autowired
  private ProductRepository productRepository;

  @GetMapping
  public ResponseEntity<Page<Product>> getProducts(Pageable pageable) {
    Page<Product> products = productRepository.findAll(pageable);
    return ResponseEntity.ok(products);
  }

  /**
   * Create a product
   * 
   * @param product
   * @return
   */
  @PostMapping("/admin/create")
  public ResponseEntity<Product> create(@RequestBody Product product) {
    Product productCreated = productService.create(product);
    return ResponseEntity.ok(productCreated);
  }

  /**
   * Update a product
   * 
   * @param product
   * @return
   */
  @PutMapping("/admin/update")
  public ResponseEntity<Product> update(@RequestBody Product product) {
    try {
      Product productUpdated = productService.update(product);
      return ResponseEntity.ok(productUpdated);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }
  }

  /**
   * Delete a product
   * 
   * @param product
   * @return
   */
  @DeleteMapping("/admin/delete")
  public ResponseEntity<Void> delete(@RequestBody Product product) {
    try {
      productService.delete(product.getId());
      return ResponseEntity.ok().build();
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }
  }

  /**
   * Restore a product
   * 
   * @param product
   * @return
   */
  @PutMapping("/admin/restore")
  public ResponseEntity<Void> restore(@RequestBody Product product) {
    try {
      productService.restore(product.getId());
      return ResponseEntity.ok().build();
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }
  }

  /**
   * Set a product as unavailable or available
   * 
   * @param product
   * @return
   */
  @PutMapping("/admin/set-available")
  public ResponseEntity<Void> setAvailable(@RequestBody Product product) {
    try {
      productService.setAvailable(product.getId());
      return ResponseEntity.ok().build();
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }
  }
}
