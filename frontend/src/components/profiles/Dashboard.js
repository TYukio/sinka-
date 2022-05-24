import { Grid, Icon, Link } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react'
import { Layout, Main } from './SideElements';

import Sidebar from '../SideDash/sidebar'

const Dashboard = ({children}) => {
  const activeMenu = true;
  return (
    <Layout>
      <Sidebar></Sidebar>
      <Main>{children}</Main>
    </Layout>
  )
}

export default Dashboard