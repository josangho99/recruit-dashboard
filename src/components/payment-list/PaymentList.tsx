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
  const TOTAL_ITEMS = paymentList?.length ?? 0;
  const ITEMS_PER_PAGE = 10;
  const PAGE_COUNT_IN_GROUP = 5;

  const currentItems = useMemo(() => {
    const endIndex = currentPage * ITEMS_PER_PAGE;
    const startIndex = endIndex - ITEMS_PER_PAGE;

    return paymentList?.slice(startIndex, endIndex);
  }, [paymentList, currentPage]);

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

  const thClass = "py-5 text-center text-base font-semibold text-gray-600 uppercase";

  return (
    <div className="flex h-[72vh] w-full flex-col rounded-xl bg-white shadow-lg">
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
