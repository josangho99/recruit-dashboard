import React, { useMemo } from "react";
import type { PaymentItem } from "@/interfaces/payment.interface";
import {
  Chart as ChartJS,
  CategoryScale,
  PointElement,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import "chartjs-adapter-date-fns";
import { options } from "@/utils/chartjs";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function Linechart({
  paymentList,
  exChangeValue,
}: {
  paymentList: PaymentItem[] | null;
  exChangeValue: string;
}) {
  const aggregatedData = useMemo(() => {
    if (!paymentList || paymentList.length === 0) {
      return { datasets: [] };
    }

    const successfulKrwPayments = paymentList.filter((p) => p.status === "SUCCESS");

    const dailyTotal = successfulKrwPayments.reduce(
      (acc, item) => {
        const dateKey = item.paymentAt.split("T")[0];

        acc[dateKey] =
          item.currency === "KRW"
            ? (acc[dateKey] | 0) + Number(item.amount)
            : (acc[dateKey] | 0) + Number(item.amount) * Number(exChangeValue);
        return acc;
      },
      {} as { [key: string]: number },
    );

    const chartDataArray = Object.keys(dailyTotal)
      .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
      .map((date) => ({
        x: date,
        y: dailyTotal[date],
      }));

    return {
      datasets: [
        {
          label: "일일 결제 금액 (KRW)",
          data: chartDataArray,
          backgroundColor: "#3AC48D",
          borderColor: "#3AC48D",
          borderWidth: 1,
        },
      ],
    };
  }, [paymentList, exChangeValue]);
  return (
    <div className="flex h-120 w-full flex-col items-center justify-center bg-white p-8">
      <div>
        <span className="text-2xl">일자별 거래 그래프</span>
      </div>

      {aggregatedData.datasets.length > 0 ? (
        <Line options={options} data={aggregatedData} />
      ) : (
        <p>결제 데이터가 없습니다.</p>
      )}
    </div>
  );
}

export default Linechart;
