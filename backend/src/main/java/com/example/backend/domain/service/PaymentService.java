package com.example.backend.domain.service;

import org.springframework.stereotype.Service;

import com.example.backend.domain.model.Product;
import com.example.backend.domain.model.User;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;

@Service
public interface PaymentService {

  public String createPaymentIntent(User user, Product product, String stringJsonData)
      throws JsonMappingException, JsonProcessingException;
}
