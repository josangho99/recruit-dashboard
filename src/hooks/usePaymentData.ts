import { useState, useEffect, useMemo } from "react";
import { getExchangeValue, getPaymentList } from "@/services/paymentService";
import { getMerchantsList } from "@/services/merchantsService";
import type { PaymentItem, CountAccumulator } from "@/interfaces/payment.interface";
import type { MerchantsItem, MerchantsRanking } from "@/interfaces/merchants.interface";

export default function usePaymentData() {
  const [paymentList, setPaymentList] = useState<PaymentItem[] | null>(null);
  const [merchantsList, setMerchantsList] = useState<MerchantsItem[] | null>(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const [exchangeValue, setExchangeValue] = useState("");
  const [successRate, setSuccessRate] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [payments, merchants, exchange] = await Promise.all([
          getPaymentList(),
          getMerchantsList(),
          getExchangeValue(),
        ]);
        setPaymentList(payments);
        setMerchantsList(merchants);
        setExchangeValue(exchange[1].subValue.split(" ")[0].replace(",", ""));
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!paymentList || paymentList.length === 0) {
      setTotalAmount(0);
      return;
    }
    const calculatedTotal = paymentList.reduce((acc, item) => {
      if (item.status === "SUCCESS") {
        const amountToAdd =
          item.currency === "KRW"
            ? Number(item.amount)
            : Number(item.amount) * Number(exchangeValue);
        return acc + amountToAdd;
      }
      return acc;
    }, 0);
    setTotalAmount(calculatedTotal);
  }, [paymentList, exchangeValue]);

  useEffect(() => {
    if (!paymentList || paymentList.length === 0) {
      setSuccessRate(0);
      return;
    }

    const finalCounts: CountAccumulator = paymentList.reduce(
      (acc: CountAccumulator, item: PaymentItem) => {
        if (item.status === "SUCCESS" || item.status === "CANCELLED" || item.status === "FAILED") {
          acc.attemptCount += 1;
        }
        if (item.status === "SUCCESS" || item.status === "CANCELLED") {
          acc.successCount += 1;
        }
        return acc;
      },
      { successCount: 0, attemptCount: 0 },
    );

    const totalAttempt = finalCounts.attemptCount;

    const rate = totalAttempt > 0 ? (finalCounts.successCount / totalAttempt) * 100 : 0;
    setSuccessRate(rate);
  }, [paymentList]);

  const merchantRankings = useMemo(() => {
    if (!paymentList || paymentList.length === 0) {
      return [];
    }
    const successfulPayments = paymentList.filter((item) => item.status === "SUCCESS");

    const aggregatedTotals = successfulPayments.reduce(
      (acc, item) => {
        const code = item.mchtCode;
        const amount =
          item.currency === "KRW"
            ? Number(item.amount)
            : Number(item.amount) * Number(exchangeValue);
        acc[code] = (acc[code] || 0) + amount;
        return acc;
      },
      {} as { [key: string]: number },
    );

    const rankingArray: MerchantsRanking[] = Object.entries(aggregatedTotals)
      .map(([code, totalAmount]) => ({
        mchtCode: code,
        totalAmount: totalAmount,
      }))
      .sort((a, b) => b.totalAmount - a.totalAmount);

    return rankingArray;
  }, [paymentList, exchangeValue]);

  return {
    paymentList,
    merchantsList,
    totalAmount,
    successRate,
    exchangeValue,
    loading,
    merchantRankings,
  };
}
