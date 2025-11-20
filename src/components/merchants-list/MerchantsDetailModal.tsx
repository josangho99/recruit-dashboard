import { getMerchantsDetail } from "@/services/merchantsService";
import { useEffect, useState } from "react";
import type { MerchantsDetail } from "@/interfaces/merchants.interface";
import { faTimes, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatDateTime } from "@/utils/stringToDate";
function MerchantsDetailModal({
  mchtCode,
  isOpen,
  onClose,
}: {
  mchtCode: string;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [detail, setDetail] = useState<MerchantsDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isOpen || !mchtCode) return;

    setIsLoading(true);
    setDetail(null);

    const fetchDetail = async () => {
      try {
        const data = await getMerchantsDetail(mchtCode);
        setDetail(data);
      } catch (err) {
        console.error("Failed to fetch merchant details:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetail();
  }, [mchtCode, isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black"
      onClick={onClose}>
      <div
        className="mx-4 w-full max-w-lg rounded-xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b p-5">
          <h3 className="text-xl font-bold text-gray-800">가맹점 상세 요약</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <FontAwesomeIcon icon={faTimes} size="lg" />
          </button>
        </div>

        <div className="flex min-h-[200px] flex-col justify-center p-6">
          {isLoading && (
            <div className="py-10 text-center text-gray-500">
              <FontAwesomeIcon icon={faSpinner} spin size="2x" className="mb-3" />
              <p>상세 정보를 불러오는 중...</p>
            </div>
          )}

          {!isLoading && detail && (
            <div className="space-y-4">
              <p>
                <strong>가맹점 코드:</strong> <span className="font-mono">{detail.mchtCode}</span>
              </p>
              <p>
                <strong>가맹점 이름:</strong> {detail.mchtName}
              </p>
              <p>
                <strong>상태:</strong>{" "}
                <span
                  className={`font-semibold ${detail.status === "ACTIVE" ? "text-green-600" : "text-red-600"}`}>
                  {detail.status}
                </span>
              </p>
              <p>
                <strong>카테고리:</strong> {detail.bizType}
              </p>
              <p>
                <strong>카테고리 코드:</strong> {detail.bizNo}
              </p>
              <p>
                <strong>주소:</strong> {detail.address}
              </p>
              <p>
                <strong>연락처:</strong> {detail.phone}
              </p>
              <p>
                <strong>Email:</strong> {detail.email}
              </p>

              <p>
                <strong>등록일:</strong> {formatDateTime(detail.registeredAt)}
              </p>
              <p>
                <strong>수정일:</strong> {formatDateTime(detail.updatedAt)}
              </p>
            </div>
          )}

          {!isLoading && !detail && (
            <div className="py-10 text-center text-gray-500">
              <p>데이터 조회에 실패했거나 항목을 찾을 수 없습니다.</p>
            </div>
          )}
        </div>

        <div className="flex justify-end border-t p-4">
          <button
            onClick={onClose}
            className="rounded-lg bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300">
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}

export default MerchantsDetailModal;
