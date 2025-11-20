import axios from "axios";
import api from "./apiConfig";
import type { ExchangeResponse, PaymentResponse } from "@/interfaces/payment.interface";

export const getPaymentList = async (): Promise<PaymentResponse["data"]> => {
  const response = await api.get<PaymentResponse>("/payments/list");
  return response.data.data;
};

export const getExchangeValue = async (): Promise<ExchangeResponse["country"]> => {
  try {
    const URL =
      "https://m.search.naver.com/p/csearch/content/qapirender.nhn?key=calculator&pkid=141&q=%ED%99%98%EC%9C%A8&where=m&u1=keb&u6=standardUnit&u7=0&u3=USD&u4=KRW&u8=down&u2=1";
    const response = await axios.get(URL);

    return response.data.country;
  } catch (error) {
    console.error("API 호출 실패:", error);
    throw error;
  }
};
