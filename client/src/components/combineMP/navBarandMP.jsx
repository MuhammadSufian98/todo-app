import React, { useState, useContext } from "react";
import MainPage from "../mainPage/mainPage.jsx";
import ImageUpload from "../imageUpload/imageUpload.jsx";
import NavBar from "../navBar/navBar.jsx";
import GreenAPI from "../GreenAPI/GreenAPI.jsx";
import { TaskContext } from "../../context.jsx";

function NavBarAndMP() {
  const { TaskImageSwitch } = useContext(TaskContext);
  const renderComponent = () => {
    switch (TaskImageSwitch) {
      case "MainPage":
        return <MainPage />;
      //   case "ImageUpload":
      //     return <ImageUpload />;
      //   case "GreenAPI":
      //     return <GreenAPI />;
      //   default:
      //     return <MainPage />;
    }
  };

  return (
    <>
      <NavBar />
      {renderComponent()}
    </>
  );
}

export default NavBarAndMP;
