import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterComponent from "./pages/RegisterComponent";
import CalendarComponent from "./pages/Calendar";
import LoginComponent from "./pages/LoginComponent";
import { AuthCtx } from "./context/AuthContext";
import { useState } from "react";

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  return (
    <div className='App'>
      <BrowserRouter>
        <AuthCtx.Provider value={{ authenticated, setAuthenticated }}>
          <Routes>
            <Route element={<RegisterComponent />} path='/register' />
            <Route element={<LoginComponent />} path='/login' />
            <Route element={<CalendarComponent />} path='/' />
          </Routes>
        </AuthCtx.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
