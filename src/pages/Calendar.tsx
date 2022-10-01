import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState, useContext, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthCtx } from "../context/AuthContext";
import { getEvents } from "../services/EventService";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import _ from "lodash";
import { IProcessedEvent } from "../interfaces/Event";

const UserCalendar = (props: any) => {
  const { authenticated } = useContext(AuthCtx);
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [processedEvents, setProcessedEvents] = useState<IProcessedEvent[]>([]);
  const at = localStorage.getItem("at");
  const localizer = momentLocalizer(moment);

  useEffect(() => {
    if (!authenticated) navigate("/login");

    getEvents(at).then((res) => {
      setEvents(res.data);

      const keyMapping: any = {
        eventTitle: "title",
        startDate: "start",
        endDate: "end",
      };

      const eventData: IProcessedEvent[] = _.map(res.data, (e) =>
        _.chain(e)
          .pick("eventTitle", "startDate", "endDate")
          .mapKeys((_v, k) => keyMapping[k])
          .update("start", (date: string) => new Date(date))
          .update("end", (date: string) => new Date(date))
          .value()
      );

      setProcessedEvents(eventData as any);
    });
  }, [at]);

  return (
    <div className='h-screen overflow-y-scroll no-scrollbar'>
      <Calendar
        localizer={localizer}
        defaultDate={new Date("2022-09-30T19:33:37.055Z")}
        events={processedEvents}
        defaultView='day'
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
