import type { CardProps } from "@/interfaces/card.interface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Card: React.FC<CardProps> = ({ title = "제목", context = "내용", icon }) => {
  return (
    <div className="flex h-30 w-[18vw] items-center justify-between rounded-xs bg-white px-6 py-2 shadow-2xs">
      <div className="flex flex-col gap-2 text-start">
        <span className="text-3xl font-semibold">{context}</span>
        <span className="text-md text-gray-500">{title}</span>
      </div>
      <FontAwesomeIcon className="text-5xl text-[#3AC48D]" icon={icon}></FontAwesomeIcon>
    </div>
  );
};
export default Card;
