import { useState } from "react";
import Cardabout from "../../components/About/CardAbout";
import Navbar from "../../components/home/Navbar/Navbar";
import Sidebar from "../../components/home/Navbar/Sidebar";

function About() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen)
  };


    return (
      <>
      <Sidebar isOpen={isOpen} toggle={toggle}></Sidebar>
       <Navbar toggle={toggle}></Navbar>
       
       <Cardabout></Cardabout>
      </>        
    )  
}
  
export default About;
  
