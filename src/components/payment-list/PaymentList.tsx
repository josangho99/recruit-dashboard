import { useState, useMemo } from "react";
import usePaymentData from "@/hooks/usePaymentData";
import Pagination from "@/components/common/Pagenation";
import { getMerchantName } from "@/hooks/useMerchantsData";

const getStatusClasses = (status: string) => {
  switch (status) {
    case "SUCCESS":
      return "text-green-700 bg-green-100 border-green-200";
    case "FAILED":
      return "text-red-700 bg-red-100 border-red-200";
    case "CANCELLED":
      return "text-yellow-700 bg-yellow-100 border-yellow-200";
    default:
      return "text-gray-600 bg-gray-100 border-gray-200";
  }
};

function PaymentList() {
  const { paymentList, merchantsList } = usePaymentData();
  const [currentPage, setCurrentPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState<string>("ALL");
  const [filterPayType, setFilterPayType] = useState<string>("ALL");
  const ITEMS_PER_PAGE = 10;
  const PAGE_COUNT_IN_GROUP = 5;

  const filteredList = useMemo(() => {
    // ⚠️ 원본 리스트가 null이거나 없으면 빈 배열 반환
    if (!paymentList || paymentList.length === 0) {
      return [];
    }

    let tempFilteredList = paymentList;

    if (filterStatus !== "ALL") {
      tempFilteredList = tempFilteredList.filter((item) => item.status === filterStatus);
    }

    if (filterPayType !== "ALL") {
      tempFilteredList = tempFilteredList.filter((item) => item.payType === filterPayType);
    }

    return tempFilteredList;
  }, [paymentList, filterStatus, filterPayType]);

  const currentItems = useMemo(() => {
    const endIndex = currentPage * ITEMS_PER_PAGE;
    const startIndex = endIndex - ITEMS_PER_PAGE;

    return filteredList?.slice(startIndex, endIndex);
  }, [filteredList, currentPage]);

  const formatDateTime = (dateString: string) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return (
        date.toLocaleDateString("ko-KR") +
        " " +
        date.toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit", hour12: false })
      );
    } catch {
      return dateString;
    }
  };

  const TOTAL_ITEMS = filteredList?.length ?? 0;

  const thClass = "py-5 text-center text-base font-semibold text-gray-600 uppercase";

  return (
    <div className="flex h-full w-full flex-col rounded-xl bg-white shadow-lg">
      <div className="flex flex-row gap-4 p-4">
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="w-25 rounded-lg border border-gray-300 p-2 transition duration-150 focus:border-[#3AC48D] focus:ring-2 focus:ring-[#3AC48D]">
          <option value="ALL">전체</option>
          <option value="SUCCESS">성공</option>
          <option value="FAILED">실패</option>
          <option value="CANCELLED">취소</option>
          <option value="PENDING">대기</option>
        </select>
        <select
          value={filterPayType}
          onChange={(e) => setFilterPayType(e.target.value)}
          className="w-25 rounded-lg border border-gray-300 p-2 transition duration-150 focus:border-[#3AC48D] focus:ring-2 focus:ring-[#3AC48D]">
          <option value="ALL">전체</option>
          <option value="ONLINE">온라인</option>
          <option value="DEVICE">단말기</option>
          <option value="MOBILE">모바일</option>
          <option value="VACT">가상계좌</option>
          <option value="BILLING">정기결제</option>
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full table-fixed divide-y divide-gray-200">
          <thead className="border-gray-400 bg-gray-200">
            <tr>
              <th className={thClass + "w-12"}>No.</th>
              <th className={thClass + "w-12"}>거래 코드</th>
              <th className={thClass + "w-12"}>가맹점 코드</th>
              <th className={thClass + "w-12"}>가맹점 이름</th>
              <th className={thClass + "w-12"}>금액</th>
              <th className={thClass + "w-12"}>수단</th>
              <th className={thClass + "w-12"}>상태</th>
              <th className={thClass + "w-12"}>결제 일시</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-300 bg-white">
            {currentItems?.map((item, index) => (
              <tr key={item.paymentCode} className="transition duration-150 hover:bg-[#3AC48D]">
                <td className="py-3 text-center text-sm text-gray-500">{index + 1}</td>
                <td className="px-3 py-3 text-center text-sm font-medium text-gray-900">
                  {item.paymentCode}
                </td>
                <td className="px-3 py-3 text-center text-sm text-gray-600">{item.mchtCode}</td>
                <td className="px-3 py-3 text-center text-sm text-gray-600">
                  {getMerchantName(merchantsList!, item.mchtCode)}
                </td>
                <td className="px-3 py-3 text-center text-sm font-semibold text-gray-800">
                  {item.currency === "KRW" ? "₩" : "$"}
                  {Number(item.amount).toLocaleString()}
                </td>

                <td className="py-3 text-center text-sm text-gray-500">{item.payType}</td>
                <td className="py-3 text-center">
                  <span
                    className={`inline-flex rounded-full border px-2 py-0.5 text-xs leading-5 font-bold ${getStatusClasses(item.status)}`}>
                    {item.status}
                  </span>
                </td>

                <td className="py-3 text-center text-sm text-gray-500">
                  {formatDateTime(item.paymentAt)}
                </td>
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

export default PaymentList;
