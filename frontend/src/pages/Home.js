import styled from "@emotion/styled";
import { AppBar, Button, Container, Typography } from "@mui/material";
import Header from "../components/HeroSection/Header";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/SideBar/Sidebar";
import Infosection from "../components/InfoSection/Infosection";
import Services from "../components/services/Services";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { homeObjOne, homeObjThree, homeObjTwo } from "../components/InfoSection/data";



function Home() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen)
  };

  return (
    <div>
      <Sidebar isOpen={isOpen} toggle={toggle}></Sidebar>
      <Navbar toggle={toggle}></Navbar>
      <Header></Header>
      <Infosection {...homeObjOne}></Infosection>
      <Infosection {...homeObjTwo}></Infosection>
      <Infosection {...homeObjThree}></Infosection>
      <Services></Services>
      <Footer></Footer>
    </div>

  );
}
export default Home;