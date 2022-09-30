import { useContext, useEffect, useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { AuthCtx } from "../context/AuthContext";
import { createEvent } from "../services/EventService";

const CalendarComponent = () => {
  const [eventDate, setEventDate] = useState(new Date());
  const [eventTitle, setEventTitle] = useState("");
  const { authenticated } = useContext(AuthCtx);
  const navigate = useNavigate();
  const at = localStorage.getItem("at");

  useEffect(() => {
    if (!authenticated) navigate("/login");
  });

  const addEvent = async () => {
    await createEvent(at, { eventTitle, eventDate });
    navigate("/");
  };

  const handleInput = (title: any) => {
    setEventTitle(title);
  };

  return (
    <>
      <input onChange={(e) => handleInput(e.currentTarget.value)} type='text' />
      <div>
        <DatePicker
          selected={eventDate}
          onChange={(date: Date) => setEventDate(date)}
        />
      </div>

      <button onClick={addEvent}>Add event</button>
    </>
  );
};

export default CalendarComponent;
