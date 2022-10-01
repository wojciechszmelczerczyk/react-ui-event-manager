import { useContext, useEffect, useState } from "react";
import DateTimePicker from "react-datetime-picker";

import { useNavigate } from "react-router-dom";
import { AuthCtx } from "../context/AuthContext";
import { createEvent } from "../services/EventService";

const CalendarComponent = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [eventTitle, setEventTitle] = useState("");
  const { authenticated } = useContext(AuthCtx);
  const navigate = useNavigate();
  const at = localStorage.getItem("at");

  useEffect(() => {
    if (!authenticated) navigate("/login");
  });

  const addEvent = async () => {
    await createEvent(at, { eventTitle, startDate, endDate });
    navigate("/");
  };

  const handleInput = (title: any) => {
    setEventTitle(title);
  };

  return (
    <>
      <input onChange={(e) => handleInput(e.currentTarget.value)} type='text' />
      <div>
        <DateTimePicker
          disableClock={true}
          onChange={setStartDate}
          value={startDate}
        />
        <DateTimePicker
          disableClock={true}
          onChange={setEndDate}
          value={endDate}
        />
      </div>

      <button onClick={addEvent}>Add event</button>
    </>
  );
};

export default CalendarComponent;
