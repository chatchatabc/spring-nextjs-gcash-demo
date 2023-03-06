package com.example.backend.application.rest;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.application.dto.PaymentCreateResponse;
import com.example.backend.domain.model.Product;
import com.example.backend.domain.model.User;
import com.example.backend.domain.repository.ProductRepository;
import com.example.backend.domain.repository.UserRepository;
import com.example.backend.domain.service.PaymentService;
import com.example.backend.infra.domain.service.PaymongoService;
import com.example.backend.infra.paymongo.PaymentIntent;

import jakarta.servlet.http.HttpServletRequest;

@RestController
public class PaymentController {

  @Autowired
  private PaymongoService paymongoService;

  @Autowired
  private PaymentService paymentService;

  @Autowired
  private ProductRepository productRepository;

  @Autowired
  private UserRepository userRepository;

  @PostMapping("/payment/create")
  public ResponseEntity<PaymentCreateResponse> create(HttpServletRequest request, @RequestBody Product product) {
    try {
      // Get user id from request
      Long userId = Long.parseLong(request.getAttribute("id").toString());
      // Get user from database
      Optional<User> queriedUser = userRepository.findById(userId);
      if (!queriedUser.isPresent()) {
        throw new Exception("User not found");
      }
      // Get product from database
      Optional<Product> queriedProduct = productRepository.findById(product.getId());
      if (!queriedProduct.isPresent()) {
        throw new Exception("Product not found");
      }
      String intent = new PaymentIntent(queriedProduct.get().formatPrice(),
          queriedProduct.get().getName() + " description",
          queriedProduct.get().getName() + " descriptor")
          .toString();
      String res = paymongoService.createPaymentIntent(intent);
      String client_key = paymentService.createPaymentIntent(queriedUser.get(), queriedProduct.get(), res);
      return ResponseEntity.ok(new PaymentCreateResponse(client_key));

    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.badRequest().build();
    }
  }
}
