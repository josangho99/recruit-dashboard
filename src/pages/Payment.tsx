import PaymentList from "@/components/payment-list/PaymentList";
import Card from "@/components/common/Card";
import {
  faCircleExclamation,
  faHourglassHalf,
  faMoneyBillTransfer,
  faSquareCheck,
} from "@fortawesome/free-solid-svg-icons";
import usePaymentData from "@/hooks/usePaymentData";

export default function Payment() {
  const { successCount, failCount, pendingCount, cancelledCount } = usePaymentData();
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex flex-row justify-between">
        <Card title="거래성공" icon={faSquareCheck} context={successCount.toString() + "건"}></Card>
        <Card
          title="거래실패"
          icon={faCircleExclamation}
          context={failCount.toString() + "건"}></Card>
        <Card
          title="환불"
          icon={faMoneyBillTransfer}
          context={cancelledCount.toString() + "건"}></Card>
        <Card
          title="거래대기"
          icon={faHourglassHalf}
          context={pendingCount.toString() + "건"}></Card>
      </div>

      <PaymentList></PaymentList>
    </div>
  );
}
