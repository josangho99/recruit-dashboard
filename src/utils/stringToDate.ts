export const formatDateTime = (dateString: string) => {
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
