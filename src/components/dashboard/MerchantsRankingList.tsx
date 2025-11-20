import type { MerchantsItem, MerchantsRanking } from "@/interfaces/merchants.interface";
import PodiumStep from "@/components/dashboard/PodiumStep";
import { getMerchantName } from "@/hooks/useMerchantsData";
function MerchantsRankingList({
  merChantsRankingList,
  merChantsList,
}: {
  merChantsRankingList: MerchantsRanking[];
  merChantsList: MerchantsItem[];
}) {
  const top3Rankings = merChantsRankingList.slice(0, 3);
  if (top3Rankings.length === 0) {
    return <div className="p-4 text-center text-gray-500">랭킹 데이터가 없습니다.</div>;
  }
  const rank1 = top3Rankings[0];
  const rank2 = top3Rankings[1];
  const rank3 = top3Rankings[2];

  const rank1Name = getMerchantName(merChantsList, rank1.mchtCode);
  const rank2Name = getMerchantName(merChantsList, rank2.mchtCode);
  const rank3Name = getMerchantName(merChantsList, rank3.mchtCode);

  return (
    <div className="flex h-110 w-[38vw] flex-col items-center gap-6 bg-white py-4">
      <div>
        <span className="text-2xl">가맹점 순위</span>
      </div>
      <div className="h-full w-100">
        <div className="flex h-full w-full items-end justify-center space-x-4">
          {rank2 && <PodiumStep mchtName={rank2Name} amount={rank2.totalAmount} rank={2} />}
          {rank1 && <PodiumStep mchtName={rank1Name} amount={rank1.totalAmount} rank={1} />}
          {rank3 && <PodiumStep mchtName={rank3Name} amount={rank3.totalAmount} rank={3} />}
        </div>
      </div>
    </div>
  );
}

export default MerchantsRankingList;
