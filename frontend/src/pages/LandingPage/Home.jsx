import Header from "../../components/home/HeroSection/Header";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/home/Navbar/Navbar";
import Sidebar from "../../components/home/Navbar/Sidebar";
import Infosection from "../../components/home/InfoSection/Infosection";
import Services from "../../components/home/InfoSection/Services";
import React, { useState } from "react";
import { homeObjOne, homeObjThree, homeObjTwo } from "../../components/home/InfoSection/data";

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
      <Services></Services>
      <Infosection {...homeObjThree}></Infosection>
      
      <Footer></Footer>
    </div>

  );
}
export default Home;