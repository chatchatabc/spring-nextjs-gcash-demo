package com.example.backend.domain.model;

import java.time.Instant;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "products")
public class Product {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column
  private String name;

  @Column
  private String description;

  @Column
  private String imageUrl;

  @Column
  private Double price;

  @Column
  private Integer quantity;

  @Column
  private Boolean isAvailable;

  @Column
  private Boolean isDeleted;

  @Column
  private Instant createdAt;

  // Persists
  @PrePersist
  protected void onCreate() {
    this.createdAt = Instant.now();
    this.isAvailable = true;
    this.isDeleted = false;
  }
}
