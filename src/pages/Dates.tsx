import React, { useState } from "react";
import moment from "moment-timezone";

const Dates: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(moment().utc());
  const [selectedTimezone, setSelectedTimezone] = useState("UTC");

  const handlePreviousWeek = () => {
    setCurrentDate(currentDate.clone().subtract(1, "week"));
  };

  const handleNextWeek = () => {
    setCurrentDate(currentDate.clone().add(1, "week"));
  };

  const handleTimezoneChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedTimezone(event.target.value);
  };

  const renderWeeklySchedule = () => {
    const startDate = currentDate.clone().startOf("week");
    const endDate = currentDate.clone().endOf("week");
    const days = [];
    const timeFormat = "hA";
  
    for (let day = startDate.clone(); day.isSameOrBefore(endDate); day.add(1, "day")) {
      const formattedDay = day.format("dddd");
      const formattedDate = day.format("MMMM Do");
  
      const times = [];
  
      for (let hour = 8; hour <= 23; hour++) {
        const formattedTime = day
          .clone()
          .hour(hour)
          .tz(selectedTimezone)
          .format(timeFormat);
        times.push(
          <div key={`${formattedDay}-${hour}`} className="time-slot">
            &nbsp;&nbsp;
            <input type="checkbox" id={`${formattedDay}-${hour}`} />
            &nbsp;&nbsp;
            <label htmlFor={`${formattedDay}-${hour}`}>{formattedTime}</label>
            &nbsp;&nbsp;
          </div>
        );
      }
  
      days.push(
        <div key={formattedDay} className="day">
          <h3>{formattedDay}</h3>
          <h4>{formattedDate}</h4>
          <div className="flex flex-wrap w-screen">{times}</div>
          ______________________________________________________________
        </div>
      );
    }
  
    return <div className="flex flex-col">{days}</div>;
  };
  

  const formattedDateTime = currentDate
    .tz(selectedTimezone)
    .format("MMMM Do, YYYY, h:mmA");

  return (
    <div className="p-4">
      <div className="flex space-x-4 mb-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={handlePreviousWeek}
        >
          Previous
        </button>
        <h2 className="text-2xl font-bold mb-4">{formattedDateTime}</h2>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={handleNextWeek}
        >
          Next
        </button>
      </div>
      <select
        value={selectedTimezone}
        onChange={handleTimezoneChange}
        className="px-4 py-2 border border-gray-300 rounded"
      >
        <option value="UTC">UTC</option>
        <option value="America/New_York">America/New_York</option>
      </select>
      <div className="grid grid-cols-7 gap-4 mt-4">
        {renderWeeklySchedule()}
      </div>
    </div>
  );
};

export default Dates;
