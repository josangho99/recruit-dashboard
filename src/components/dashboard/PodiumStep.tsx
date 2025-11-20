import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown, faMedal } from "@fortawesome/free-solid-svg-icons";
import type { PodiumStepProps } from "@/interfaces/merchants.interface";

export default function PodiumStep({ mchtName, amount, rank }: PodiumStepProps) {
  const height = rank === 1 ? "h-full" : rank === 2 ? "h-3/4" : "h-2/4";
  const bgColor = rank === 1 ? "bg-amber-400" : rank === 2 ? "bg-gray-400" : "bg-amber-700";
  const icon = rank === 1 ? faCrown : faMedal;

  return (
    <div
      className={`flex h-full w-full flex-col items-center justify-end transition-all duration-500`}>
      <div className="mb-2 text-center text-gray-800">
        <p className="w-full truncate text-base font-bold">{mchtName}</p>
        <p className="w-full truncate text-sm font-semibold">{amount.toLocaleString()}원</p>
      </div>
      <div
        className={`w-full ${height} ${bgColor} flex flex-col items-center justify-end rounded-t-lg p-2 font-bold text-white shadow-xl`}>
        <span className="text-2xl">
          <FontAwesomeIcon icon={icon} className={rank === 1 ? "text-yellow-700" : ""} />
        </span>
        <span className="mt-1 text-3xl">{rank}</span>
      </div>
    </div>
  );
}
