import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
function MyDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dropdown bg-slate-700">
      <button className="dropdown-toggle" onClick={toggleDropdown}>
        기간
      </button>
      {isOpen && (
        <div className="dropdown-menu">
          <Calendar />
        </div>
      )}
    </div>
  );
}

export default MyDropdown;
