import React, { useState, useContext } from "react";
import MainPage from "../mainPage/mainPage.jsx";
import ImageUpload from "../imageUpload/imageUpload.jsx";
import NavBar from "../navBar/navBar.jsx";
import { TaskContext } from "../../context.jsx";

function NavBarAndMP() {
  const { TaskImageSwitch } = useContext(TaskContext);
  return (
    <>
      <NavBar />
      {TaskImageSwitch ? <ImageUpload /> : <MainPage />}
    </>
  );
}

export default NavBarAndMP;
