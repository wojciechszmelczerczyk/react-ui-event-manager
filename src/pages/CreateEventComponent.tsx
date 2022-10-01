import { useContext, useEffect, useState } from "react";
import DateTimePicker from "react-datetime-picker";

import { useNavigate } from "react-router-dom";
import { AuthCtx } from "../context/AuthContext";
import { createEvent } from "../services/EventService";

const CalendarComponent = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [error, setError] = useState(null);

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
    <div className='flex min-h-screen justify-center items-center'>
      <div className='flex flex-col bg-white h-96 w-80 md:h-144 md:w-128 rounded-lg shadow-lg'>
        <h1 className='text-blue-500 self-center my-3 text-lg lg:my-6'>
          Create event
        </h1>
        <div className='flex self-center flex-row'>
          <label className='text-black mx-2 text-lg self-center'>Title:</label>
          <input
            className='w-48 h-8 self-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block  p-2.5 focus:ring-blue-500 focus:border-blue-500 lg:w-96'
            onChange={(e) => handleInput(e.currentTarget.value)}
            type='text'
          />
        </div>
        <div className='flex flex-col grow'>
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

        <button
          className='bg-blue-500 w-40 h-8 rounded-lg self-center text-white my-6'
          onClick={addEvent}
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default CalendarComponent;
