package com.example.backend.infra.domain.service;

import java.io.IOException;

import org.springframework.stereotype.Service;

@Service
public interface PaymongoService {

  public String createPaymentIntent(String stringJsonData) throws IOException;

}
