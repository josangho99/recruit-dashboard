import api from "./apiConfig";
import type { MerchantsResponse, MerchantsDetailResponse } from "@/interfaces/merchants.interface";

export const getMerchantsList = async (): Promise<MerchantsResponse["data"]> => {
  const response = await api.get<MerchantsResponse>("/merchants/list");
  return response.data.data;
};

export const getMerchantsDetail = async (tid: string): Promise<MerchantsDetailResponse["data"]> => {
  const response = await api.get<MerchantsDetailResponse>(`/merchants/details/${tid}`);
  return response.data.data;
};
