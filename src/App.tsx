import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterComponent from "./pages/RegisterComponent";
import CalendarComponent from "./pages/Calendar";

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route element={<RegisterComponent />} path='/' />
          <Route element={<CalendarComponent />} path='/calendar' />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
