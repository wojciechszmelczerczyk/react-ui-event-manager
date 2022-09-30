import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterComponent from "./pages/RegisterComponent";
import CreateEventComponent from "./pages/CreateEventComponent";
import LoginComponent from "./pages/LoginComponent";
import Calendar from "./pages/Calendar";

import { AuthCtx } from "./context/AuthContext";
import { useState } from "react";

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  return (
    <div className='App'>
      <BrowserRouter>
        <AuthCtx.Provider value={{ authenticated, setAuthenticated }}>
          <Routes>
            <Route element={<Calendar />} path='/' />
            <Route element={<CreateEventComponent />} path='/createEvent' />
            <Route element={<RegisterComponent />} path='/register' />
            <Route element={<LoginComponent />} path='/login' />
          </Routes>
        </AuthCtx.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
