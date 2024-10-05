import "./App.css";
import NavBarAndMP from "./components/combineMP/navBarandMP.jsx";
import Login from "./components/log-In/login.jsx";
import ImageUpload from "./components/imageUpload/imageUpload.jsx"
import PrivateRoute from "./privateRouter.jsx";
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
          <Route
            path="/image"
            element={<ImageUpload />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
