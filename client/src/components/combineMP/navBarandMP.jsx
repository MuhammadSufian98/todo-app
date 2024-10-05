import React, { useState } from "react";
import MainPage from "../mainPage/mainPage.jsx";
import ImageUpload from "../imageUpload/imageUpload.jsx";
import NavBar from "../navBar/navBar.jsx";

function NavBarAndMP() {
  const [MainPageORImagePage, setMainPageORImagePage] = useState(true);
  return (
    <>
      <NavBar />
      {MainPageORImagePage ? <ImageUpload /> : <MainPage />}
    </>
  );
}

export default NavBarAndMP;
