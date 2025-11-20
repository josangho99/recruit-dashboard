import type { MerchantsItem } from "@/interfaces/merchants.interface";

export function getMerchantName(merchantsList: MerchantsItem[], targetCode: string) {
  const merchant = merchantsList.find((item) => item.mchtCode === targetCode);
  return merchant ? merchant.mchtName : "Not Found Code";
}

export const getStatusClasses = (status: string) => {
  switch (status) {
    case "ACTIVE":
      return "text-green-700 bg-green-100 border-green-200";
    case "READY":
      return "text-yellow-700 bg-yellow-100 border-yellow-200";
    case "INACTIVE":
      return "text-blue-700 bg-blue-100 border-blue-200";
    case "CLOSED":
      return "text-red-700 bg-red-100 border-red-200";
    default:
      return "text-gray-600 bg-gray-100 border-gray-200";
  }
};
