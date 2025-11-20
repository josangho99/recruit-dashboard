import type { CardProps } from "@/interfaces/card.interface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Card: React.FC<CardProps> = ({ title = "제목", context = "내용", icon }) => {
  const iconClass = (title: string) => {
    switch (title) {
      case "거래실패":
        return "text-5xl text-[red]";
      case "환불":
        return "text-5xl text-yellow-400";
      case "총 가맹점 수":
        return "text-5xl text-sky-500";
      case "총 정산 금액":
        return "text-5xl text-yellow-400";
      case "거래대기":
        return "text-5xl text-gray-600";

      default:
        return "text-5xl text-[#3ac48d]";
    }
  };

  return (
    <div className="flex h-30 w-[18vw] items-center justify-between rounded-xs bg-white px-6 py-2 shadow-2xs">
      <div className="flex flex-col gap-2 text-start">
        <span className="text-3xl font-semibold">{context}</span>
        <span className="text-md text-gray-500">{title}</span>
      </div>
      <FontAwesomeIcon className={iconClass(title)} icon={icon}></FontAwesomeIcon>
    </div>
  );
};
export default Card;
