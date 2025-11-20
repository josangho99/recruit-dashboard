import { useEffect, useState } from "react";
import Card from "@/components/common/Card";
import { getExchangeValue, getPaymentList } from "@/services/paymentService";
import { getMerchantsList } from "@/services/merchantsService";
import type { PaymentItem, CountAccumulator } from "@/interfaces/payment.interface";
import type { MerchantsItem } from "@/interfaces/merchants.interface";
import { faClipboardList, faCoins, faPercent, faStore } from "@fortawesome/free-solid-svg-icons";

function Dashboard() {
  const [paymentList, setPaymentList] = useState<PaymentItem[] | null>(null);
  const [merchantsList, setMerchantsList] = useState<MerchantsItem[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [totalAmount, setTotalAmount] = useState(0);
  const [exchangeValue, setExchangeValue] = useState("");
  const [successRate, setSuccessRate] = useState(0);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const data = await getPaymentList();
        setPaymentList(data); // 데이터 저장
      } catch (error) {
        console.error("Failed to fetch payment list:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPayments();
  }, []);

  useEffect(() => {
    const fetchMerchants = async () => {
      try {
        const data = await getMerchantsList();
        setMerchantsList(data);
      } catch (error) {
        console.error("Failed to fetch merchants list:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMerchants();
  }, []);

  useEffect(() => {
    const fetchExchageValue = async () => {
      try {
        const data = await getExchangeValue();
        setExchangeValue(data[1].subValue.split(" ")[0].replace(",", ""));
      } catch (error) {
        console.error("Failed to fetch merchants list:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchExchageValue();
  }, [exchangeValue]);

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

        // SUCCESS와 CANCELLED는 '성공 승인'으로 간주하여 분자에 포함
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

  if (loading) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="flex w-full flex-col px-4 py-10">
      <div className="flex w-full justify-between">
        <Card
          title="총 거래 건수"
          icon={faClipboardList}
          context={`${paymentList?.length ?? 0}` + "건"}></Card>
        <Card
          title="총 가맹점 수"
          icon={faStore}
          context={`${merchantsList?.length ?? 0}` + "개"}></Card>
        <Card
          title="총 정산 금액"
          icon={faCoins}
          context={`${totalAmount.toLocaleString()}` + "원"}></Card>
        <Card
          title="결제 성공률"
          icon={faPercent}
          context={`${successRate.toFixed(2)}` + "%"}></Card>
      </div>
    </div>
  );
}

export default Dashboard;
