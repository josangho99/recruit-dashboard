import api from "./apiConfig";
import type { MerchantsResponse } from "@/interfaces/merchants.interface";

export const getMerchantsList = async (): Promise<MerchantsResponse["data"]> => {
  const response = await api.get<MerchantsResponse>("/merchants/list");
  return response.data.data;
};
