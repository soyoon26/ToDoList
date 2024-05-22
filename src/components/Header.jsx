import { memo } from "react";
const Header = () => {
  const date = new Date().toLocaleDateString("ko-KR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <div className="w-4/5 flex justify-end mr-10">
      <div className="p-3  mt-3 text-xl">📆: {date}</div>
    </div>
  );
};
export default memo(Header);
