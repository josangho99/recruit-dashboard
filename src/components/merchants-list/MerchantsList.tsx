import { useState, useMemo } from "react";
import usePaymentData from "@/hooks/usePaymentData";
import Pagination from "@/components/common/Pagenation";

export default function MerchantsList() {
  const { merchantsList } = usePaymentData();
  const [currentPage, setCurrentPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState<string>("ALL");
  const ITEMS_PER_PAGE = 10;
  const PAGE_COUNT_IN_GROUP = 5;

  const filteredList = useMemo(() => {
    // ⚠️ 원본 리스트가 null이거나 없으면 빈 배열 반환
    if (!merchantsList || merchantsList.length === 0) {
      return [];
    }

    let tempFilteredList = merchantsList;

    if (filterStatus !== "ALL") {
      tempFilteredList = tempFilteredList.filter((item) => item.status === filterStatus);
    }

    return tempFilteredList;
  }, [merchantsList, filterStatus]);

  const currentItems = useMemo(() => {
    const endIndex = currentPage * ITEMS_PER_PAGE;
    const startIndex = endIndex - ITEMS_PER_PAGE;

    return filteredList?.slice(startIndex, endIndex);
  }, [filteredList, currentPage]);
  const TOTAL_ITEMS = filteredList?.length ?? 0;

  const getStatusClasses = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "text-green-700 bg-green-100 border-green-200";
      case "READY":
        return "text-yellow-700 bg-yellow-100 border-yellow-200";
      case "INACTIVE":
        return "text-blue-700 bg-blue-100 border-blue-200";
      case "CLOSED":
        return "text-red-700 bg-red-100 border-red-200";
      default:
        return "text-gray-600 bg-gray-100 border-gray-200";
    }
  };

  const thClass = "py-5 text-center text-base font-semibold text-gray-600 uppercase";

  return (
    <div className="flex h-full w-full flex-col bg-white shadow-lg">
      <div className="flex flex-row gap-4 p-4">
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="w-25 rounded-lg border border-gray-300 p-2 transition duration-150 focus:border-[#3AC48D] focus:ring-2 focus:ring-[#3AC48D]">
          <option value="ALL">전체</option>
          <option value="ACTIVE">활성</option>
          <option value="READY">대기</option>
          <option value="INACTIVE">중지</option>
          <option value="CLOSED">폐기</option>
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full table-fixed divide-y divide-gray-200">
          <thead className="border-gray-400 bg-gray-200">
            <tr>
              <th className={thClass + "w-12"}>No.</th>
              <th className={thClass + "w-12"}>가맹점 코드</th>
              <th className={thClass + "w-12"}>가맹점 이름</th>
              <th className={thClass + "w-12"}>상태</th>
              <th className={thClass + "w-12"}>카테고리</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-300 bg-white">
            {currentItems?.map((item, index) => (
              <tr key={item.mchtCode} className="transition duration-150 hover:bg-[#3AC48D]">
                <td className="py-3 text-center text-sm text-gray-500">{index + 1}</td>
                <td className="px-3 py-3 text-center text-sm font-medium text-gray-900">
                  {item.mchtCode}
                </td>
                <td className="px-3 py-3 text-center text-sm font-medium text-gray-900">
                  {item.mchtName}
                </td>
                <td className="py-3 text-center">
                  <span
                    className={`inline-flex rounded-full border px-2 py-0.5 text-xs leading-5 font-bold ${getStatusClasses(item.status)}`}>
                    {item.status}
                  </span>
                </td>
                <td className="py-3 text-center text-sm text-gray-600">{item.bizType}</td>
              </tr>
            ))}
            {TOTAL_ITEMS === 0 && (
              <tr>
                <td colSpan={8} className="py-8 text-center text-lg text-gray-500">
                  거래 내역이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div>
        <Pagination
          totalItems={TOTAL_ITEMS}
          itemCountPerPage={ITEMS_PER_PAGE}
          pageCount={PAGE_COUNT_IN_GROUP}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}></Pagination>
      </div>
    </div>
  );
}
