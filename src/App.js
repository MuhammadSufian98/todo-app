import "./App.css";
import NavBarAndMP from "./components/combineMP/navBarandMP.js";
import Login from "./components/log-In/login";
import PrivateRoute from "./privateRouter.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="MainApp">
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Login />}
          />
          <Route
            path="/home"
            element={<PrivateRoute element={<NavBarAndMP />} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
