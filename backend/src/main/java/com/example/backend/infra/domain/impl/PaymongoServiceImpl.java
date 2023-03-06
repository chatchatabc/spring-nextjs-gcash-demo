package com.example.backend.infra.domain.impl;

import java.io.IOException;
import java.util.Base64;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.example.backend.infra.domain.service.PaymongoService;

import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

@Service
public class PaymongoServiceImpl implements PaymongoService {

  private OkHttpClient client = new OkHttpClient();
  private MediaType mediaType = MediaType.get("application/json");

  @Value("${paymongo.secret}")
  private String secret;

  @Override
  public String createPaymentIntent(String stringJsonData) throws IOException {

    String credentials = secret + ":";
    String base64Credentials = Base64.getEncoder().encodeToString(credentials.getBytes());

    RequestBody body = RequestBody.create(stringJsonData, mediaType);
    Request request = new Request.Builder()
        .url("https://api.paymongo.com/v1/payment_intents")
        .post(body)
        .addHeader("accept", "application/json")
        .addHeader("content-type", "application/json")
        .addHeader("Authorization", "Basic " + base64Credentials)
        .build();

    try (Response response = client.newCall(request).execute()) {
      if (response.code() >= 300) {
        System.out.println("Bad Request");
        System.out.println(response.body().string());
        throw new IOException("Bad Request");
      }
      return response.body().string();
    }
  }

}
