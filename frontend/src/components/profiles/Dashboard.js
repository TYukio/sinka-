import { Divider, Grid, Link, Typography } from '@mui/material';
import React from 'react'

import {  Center, Bottom, Sidebar, Top } from "./DashboardElements";
const Dashboard = () => {
    return (
        <Sidebar>
            <Top>
                <Typography sx={{
                    fontSize: '20px',
                    fontWeight: 'bold',

                }}>
                    Logo
                
                </Typography>
                
            </Top>
            <Divider sx={{width:'10rem',}}></Divider>
            <Center>
                <Grid>
                    <Grid>
                        <Typography>AuAU</Typography>
                    </Grid>
                    <Grid>
                        <Typography>AuAU</Typography>
                    </Grid>
                    <Grid>
                        <Typography>AuAU</Typography>
                    </Grid>
                    <Grid>
                        <Typography>AuAU</Typography>
                    </Grid>
                </Grid>
            </Center>
            <Bottom>Bottom</Bottom>
        </Sidebar>
    )
}

export default Dashboard
