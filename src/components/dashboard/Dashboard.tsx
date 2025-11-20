import Card from "@/components/common/Card";
import MerchantsRankingList from "@/components/dashboard/MerchantsRankingList";
import usePaymentData from "@/hooks/usePaymentData";
import { faClipboardList, faCoins, faPercent, faStore } from "@fortawesome/free-solid-svg-icons";
import Linechart from "./Linechart";
import PieChart from "./PieChart";

function Dashboard() {
  const {
    paymentList,
    merchantsList,
    totalAmount,
    successRate,
    exchangeValue,
    loading,
    merchantRankings,
  } = usePaymentData();

  if (loading) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="flex w-full flex-col px-4 py-4">
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
      <div className="mt-8 flex w-full justify-center bg-white">
        <Linechart paymentList={paymentList} exChangeValue={exchangeValue}></Linechart>
      </div>
      <div className="mt-8 flex w-full justify-between">
        <PieChart paymentList={paymentList}></PieChart>
        <MerchantsRankingList
          merChantsRankingList={merchantRankings}
          merChantsList={merchantsList!}></MerchantsRankingList>
      </div>
    </div>
  );
}

export default Dashboard;
