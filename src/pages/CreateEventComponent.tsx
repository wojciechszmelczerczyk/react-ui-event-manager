import { useContext, useEffect, useState } from "react";
import DateTimePicker from "react-datetime-picker";

import { useNavigate } from "react-router-dom";
import { AuthCtx } from "../context/AuthContext";
import { createEvent } from "../services/EventService";

const CalendarComponent = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [errors, setErrors] = useState([]);

  const [eventTitle, setEventTitle] = useState("");
  const { authenticated } = useContext(AuthCtx);
  const navigate = useNavigate();
  const at = localStorage.getItem("at");

  useEffect(() => {
    if (!authenticated) navigate("/login");
  });

  const addEvent = async () => {
    try {
      await createEvent(at, { eventTitle, startDate, endDate });
      navigate("/");
    } catch (e) {
      const errors = e.response.data.split(":");
      setErrors(errors);
    }
  };

  const handleInput = (title: any) => {
    setErrors([]);
    setEventTitle(title);
  };

  return (
    <div className='flex min-h-screen justify-center items-center'>
      <div className='flex flex-col bg-white h-96 w-80 md:h-144 md:w-128 rounded-lg shadow-lg'>
        <div className='flex justify-center items-center h-1/4 md:h-1/3'>
          <h1 className='text-blue-500 self-center text-lg'>Create event</h1>
        </div>
        <div
          data-cy='eventError'
          className={
            errors.length > 0
              ? "absolute bottom-0 right-0 w-64 self-center min-h-fit my-6 text-white bg-red-500 rounded-lg md:w-96"
              : ""
          }
        >
          {errors
            .filter((err: any) =>
              // include error messages with specific string
              err.includes("has to be provided")
            )
            .map((filteredErr: any) => (
              <li data-cy='errMsg' className='mx-2 list-none	text-white'>
                {filteredErr.includes(",") ? (
                  // if error message include ',' char, use regex and cut everything after symbol
                  <>{filteredErr.replace(/, [a-zA-Z]*/, "")}</>
                ) : (
                  // otherwise display error
                  <>{filteredErr}</>
                )}
              </li>
            ))}
        </div>
        <div className='h-1/5 self-center'>
          <input
            placeholder='Title'
            data-cy='eventTitleInput'
            className='h-8 w-64 md:w-96 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block p-2.5 focus:ring-blue-500 focus:border-blue-500 lg:w-96'
            onChange={(e) => handleInput(e.currentTarget.value)}
            type='text'
          />
        </div>
        <div className='flex items-center flex-col grow space-y-10 md:space-y-20'>
          <div className='flex'>
            <DateTimePicker
              className='w-64 md:w-96'
              data-cy='startDate'
              disableClock={true}
              maxDate={endDate}
              onChange={setStartDate}
              value={startDate}
            />
          </div>
          <div className='flex'>
            <DateTimePicker
              className='w-64 md:w-96'
              data-cy='endDate'
              disableClock={true}
              onChange={setEndDate}
              value={endDate}
            />
          </div>
        </div>

        <button
          data-cy='createEventBtn'
          className='my-8 bg-white w-64 h-8 rounded-lg shadow-lg self-center text-white md:w-96 hover:bg-blue-500'
          onClick={addEvent}
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default CalendarComponent;
