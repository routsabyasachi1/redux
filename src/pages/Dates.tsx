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

  const handleTimezoneChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTimezone(event.target.value);
  };

  const renderWeeklySchedule = () => {
    const startDate = currentDate.clone().startOf("week");
    const endDate = currentDate.clone().endOf("week");
    const days = [];
    const timeFormat = "hA";

    for (let day = startDate.clone(); day.isSameOrBefore(endDate); day.add(1, "day")) {
      const formattedDay = day.format("dddd");
      const times = [];

      for (let hour = 8; hour <= 23; hour++) {
        const formattedTime = day.clone().hour(hour).tz(selectedTimezone).format(timeFormat);
        times.push(
          <div key={`${formattedDay}-${hour}`} className="time-slot">
            <input type="checkbox" id={`${formattedDay}-${hour}`} />
            <label htmlFor={`${formattedDay}-${hour}`}>{formattedTime}</label>
          </div>
        );
      }

      days.push(
        <div key={formattedDay} className="day">
          <h3>{formattedDay}</h3>
          {times}
        </div>
      );
    }

    return days;
  };

  const formattedDateTime = currentDate.tz(selectedTimezone).format("MMMM Do, YYYY, h:mmA");

  return (
    <div>
      <h2>{formattedDateTime}</h2>
      <div className="swipe-buttons">
        <button onClick={handlePreviousWeek}>Previous</button>
        <button onClick={handleNextWeek}>Next</button>
      </div>
      <select value={selectedTimezone} onChange={handleTimezoneChange}>
        <option value="UTC">UTC</option>
        <option value="America/New_York">America/New_York</option>
      </select>
      <div className="weekly-schedule">{renderWeeklySchedule()}</div>
    </div>
  );
};

export default Dates;
