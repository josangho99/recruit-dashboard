import type { MerchantsItem } from "@/interfaces/merchants.interface";

export function getMerchantName(merchantsList: MerchantsItem[], targetCode: string) {
  const merchant = merchantsList.find((item) => item.mchtCode === targetCode);
  return merchant ? merchant.mchtName : "Not Found Code";
}
