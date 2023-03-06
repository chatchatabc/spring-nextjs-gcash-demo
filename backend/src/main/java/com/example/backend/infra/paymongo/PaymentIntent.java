package com.example.backend.infra.paymongo;

import java.util.HashMap;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PaymentIntent {
  // Note: This PaymentIntent is tailored to perform gcash only
  private int amount;
  private String[] payment_method_allowed = new String[] { "gcash" };
  private HashMap<String, HashMap<String, String>> payment_method_options = new HashMap<>();
  private String currency = "PHP";
  private String description;
  private String statement_descriptor;

  /**
   * PaymentIntent constructor
   * 
   * @param amount
   * @param description
   * @param statement_descriptor
   */
  public PaymentIntent(int amount, String description, String statement_descriptor) {
    this.amount = amount;
    this.description = description;
    this.statement_descriptor = statement_descriptor;
    this.payment_method_options.put("card", new HashMap<>());
    this.payment_method_options.get("card").put("request_three_d_secure", "any");
  }

  public String toString() {
    ObjectMapper mapper = new ObjectMapper();
    try {
      HashMap<String, HashMap<String, PaymentIntent>> formatted = new HashMap<>();
      formatted.put("data", new HashMap<>());
      formatted.get("data").put("attributes", this);
      String json = mapper.writeValueAsString(formatted);
      return json;
    } catch (JsonProcessingException e) {
      return null;
    }
  }
}
