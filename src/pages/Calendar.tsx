import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState, useContext, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthCtx } from "../context/AuthContext";
import { getEvents, getEvent } from "../services/EventService";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import _ from "lodash";
import { IProcessedEvent } from "../interfaces/Event";
import EventPrompt from "../components/EventPrompt";
import { EventPromptCtx } from "../context/EventPromptContext";

const UserCalendar = (props: any) => {
  const { authenticated } = useContext(AuthCtx);
  const { isEventPromptVisible, setIsEventPromptVisible } =
    useContext(EventPromptCtx);
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [eventDetails, setEventDetails] = useState({});
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
  }, [processedEvents]);

  const handleEvent = async (event: any) => {
    // prompt on
    setIsEventPromptVisible(true);

    // find user by title
    const res = await getEvent(at, event.title);

    setEventDetails(res.data);
  };

  return (
    <div className='h-screen overflow-y-scroll z-50 no-scrollbar'>
      {isEventPromptVisible ? <EventPrompt eventDetails={eventDetails} /> : ""}
      <Calendar
        className={isEventPromptVisible ? "opacity-50" : ""}
        localizer={localizer}
        defaultDate={new Date("2022-09-30T19:33:37.055Z")}
        events={processedEvents}
        onSelectEvent={(e) => handleEvent(e)}
        defaultView='day'
        step={30}
      />
      <div
        className={`absolute bottom-5 right-5 z-10 flex items-center justify-center w-16 h-16 rounded-full shadow-lg bg-blue-500 ${
          isEventPromptVisible ? "opacity-50 pointer-events-none:" : ""
        }`}
      >
        {isEventPromptVisible ? (
          <p className='text-5xl text-white'>+</p>
        ) : (
          <NavLink className='text-5xl text-white disabled' to='/createEvent'>
            +
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default UserCalendar;
