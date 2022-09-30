import { useState, useContext, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthCtx } from "../context/AuthContext";
import { getEvents } from "../services/EventService";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";

const UserCalendar = (props: any) => {
  const { authenticated } = useContext(AuthCtx);
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const at = localStorage.getItem("at");
  const localizer = momentLocalizer(moment);

  useEffect(() => {
    if (!authenticated) navigate("/login");

    getEvents(at).then((res) => setEvents(res.data));
  });
  return (
    <div className='h-screen overflow-y-scroll no-scrollbar'>
      <Calendar
        localizer={localizer}
        defaultDate={new Date("2022-09-30T19:33:37.055Z")}
        defaultView='day'
        events={events}
        step={30}
      />
      <div className='absolute bottom-5 right-5 z-3 flex items-center justify-center w-16 h-16 rounded-full bg-blue-500 hover:bg-blue-700'>
        <NavLink className='text-5xl text-white' to='/createEvent'>
          +
        </NavLink>
      </div>
    </div>
  );
};

export default UserCalendar;
