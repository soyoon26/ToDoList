import Calendar from "react-calendar";
import moment from "moment";
import "./CalendarPage.css";
import "react-calendar/dist/Calendar.css";
const CalendarPage = () => {
  return (
    <div className="w-full">
      <Calendar formatDay={(locale, date) => moment(date).format("DD")} />
    </div>
  );
};
export default CalendarPage;
