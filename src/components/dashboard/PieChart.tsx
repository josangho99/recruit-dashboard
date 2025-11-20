import { useMemo } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import type { PaymentItem, PayTypeCount } from "@/interfaces/payment.interface";

ChartJS.register(ArcElement, Tooltip, Legend);

function PieChart({ paymentList }: { paymentList: PaymentItem[] | null }) {
  const payTypeData = useMemo(() => {
    if (!paymentList || paymentList.length === 0) {
      return { datasets: [] };
    }
    const payTypeCounts: PayTypeCount = paymentList.reduce((acc, item) => {
      const payType = item.payType;

      acc[payType] = (acc[payType] || 0) + 1;

      return acc;
    }, {} as PayTypeCount);

    const chartDataArray = Object.keys(payTypeCounts).map((payType) => ({
      label: payType,
      count: payTypeCounts[payType],
    }));

    const labels = chartDataArray.map((item) => item.label);
    const dataValues = chartDataArray.map((item) => item.count);

    return {
      labels: labels,
      datasets: [
        {
          labels: "결제 수단별 건수",
          data: dataValues,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };
  }, [paymentList]);

  return (
    <div className="flex h-110 w-[38vw] flex-col items-center gap-4 bg-white pt-4 pb-15">
      <div>
        <span className="text-2xl">디바이스별 결제 횟수</span>
      </div>
      {payTypeData.datasets.length > 0 ? (
        <Pie data={payTypeData} />
      ) : (
        <p>결제 데이터가 없습니다.</p>
      )}
    </div>
  );
}

export default PieChart;
