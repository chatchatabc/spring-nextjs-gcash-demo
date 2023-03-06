package com.example.backend.impl.domain.service;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.domain.model.Payment;
import com.example.backend.domain.model.Product;
import com.example.backend.domain.model.User;
import com.example.backend.domain.repository.PaymentRepository;
import com.example.backend.domain.service.PaymentService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class PaymentServiceImpl implements PaymentService {

  @Autowired
  private PaymentRepository paymentRepository;

  @Override
  public String createPaymentIntent(User user, Product product, String stringJsonData)
      throws JsonMappingException, JsonProcessingException {
    Payment payment = new Payment();
    // Convert stringJsonData to HashMap
    ObjectMapper mapper = new ObjectMapper();
    HashMap<String, Object> result = mapper.readValue(stringJsonData, new TypeReference<HashMap<String, Object>>() {
    });

    // Set values
    payment.setUser(user);
    payment.setProduct(product);
    // TODO: Create dedicate dto for payment
    payment.setPaymentId((String) ((HashMap<String, Object>) result.get("data")).get("id"));
    payment.setClientKey(
        (String) ((HashMap<String, Object>) ((HashMap<String, Object>) result.get("data")).get("attributes"))
            .get("client_key"));
    payment
        .setStatus((String) ((HashMap<String, Object>) ((HashMap<String, Object>) result.get("data")).get("attributes"))
            .get("status"));

    paymentRepository.save(payment);
    return payment.getClientKey();
  }

}
