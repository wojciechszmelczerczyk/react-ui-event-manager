import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterComponent from "./pages/RegisterComponent";
import CalendarComponent from "./pages/Calendar";
import LoginComponent from "./pages/LoginComponent";

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route element={<RegisterComponent />} path='/' />
          <Route element={<LoginComponent />} path='/login' />
          <Route element={<CalendarComponent />} path='/calendar' />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
