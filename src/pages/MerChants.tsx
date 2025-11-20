import MerchantsList from "@/components/merchants-list/MerchantsList";
import Card from "@/components/common/Card";
import usePaymentData from "@/hooks/usePaymentData";
import {
  faHourglassHalf,
  faShop,
  faShopLock,
  faShopSlash,
} from "@fortawesome/free-solid-svg-icons";
export default function MerChants() {
  const { activeCount, inactiveCount, readyCount, closedCount } = usePaymentData();
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex flex-row justify-between">
        <Card title="활성" icon={faShop} context={activeCount.toString() + "개"}></Card>
        <Card title="폐기" icon={faShopSlash} context={inactiveCount.toString() + "개"}></Card>
        <Card title="대기" icon={faHourglassHalf} context={readyCount.toString() + "개"}></Card>
        <Card title="중지" icon={faShopLock} context={closedCount.toString() + "개"}></Card>
      </div>
      <MerchantsList></MerchantsList>
    </div>
  );
}
