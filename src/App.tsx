import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterComponent from "./pages/RegisterComponent";
import CreateEventComponent from "./pages/CreateEventComponent";
import LoginComponent from "./pages/LoginComponent";
import Calendar from "./pages/Calendar";

import { AuthCtx } from "./context/AuthContext";
import { EventPromptCtx } from "./context/EventPromptContext";

import { useState } from "react";
import { DeleteDialogCtx } from "./context/DeleteDialogContext";

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [isEventPromptVisible, setIsEventPromptVisible] = useState(false);
  const [isDialogVisible, setIsDialogVisible] = useState(false);

  return (
    <div className='App'>
      <BrowserRouter>
        <AuthCtx.Provider value={{ authenticated, setAuthenticated }}>
          <EventPromptCtx.Provider
            value={{ isEventPromptVisible, setIsEventPromptVisible }}
          >
            <DeleteDialogCtx.Provider
              value={{ isDialogVisible, setIsDialogVisible }}
            >
              <Routes>
                <Route element={<Calendar />} path='/' />
                <Route element={<CreateEventComponent />} path='/createEvent' />
                <Route element={<RegisterComponent />} path='/register' />
                <Route element={<LoginComponent />} path='/login' />
              </Routes>
            </DeleteDialogCtx.Provider>
          </EventPromptCtx.Provider>
        </AuthCtx.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
