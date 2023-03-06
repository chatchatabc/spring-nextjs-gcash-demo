package com.example.backend.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.backend.domain.model.Payment;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {

}
