import { useState } from "react";
import Cardabout from "../../components/About/CardAbout";
import Navbar from "../../components/home/Navbar/Navbar";
import Sidebar from "../../components/home/Navbar/Sidebar";
import Cardlocal from '../../components/cardlocal';
import { Stack  } from "@mui/material";

function About() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen)
  };


  return (
    <>
      <Sidebar isOpen={isOpen} toggle={toggle}></Sidebar>
      <Navbar toggle={toggle}></Navbar>
      <Stack direction={'row'} sx={{
        justifyContent:'center',
        gap:'2em',
        flexWrap:'wrap',
      }}>
        
      </Stack>
      <Cardabout></Cardabout>
    </>
  )
}

export default About;

