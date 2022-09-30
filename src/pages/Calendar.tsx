import { useContext, useEffect, useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { AuthCtx } from "../context/AuthContext";

const CalendarComponent = () => {
  const [startDate, setStartDate] = useState(new Date());
  const { authenticated } = useContext(AuthCtx);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authenticated) navigate("/login");
  });

  return (
    <div>
      <DatePicker
        selected={startDate}
        onChange={(date: Date) => setStartDate(date)}
      />
    </div>
  );
};

export default CalendarComponent;
