import * as React from 'react';
import Box from '@mui/material/Box';

import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { SideBar } from '@/components/sidebar/SideBar';

const drawerWidth = 240;

export default function ResponsiveDrawer(props) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <Box sx={{ display: 'flex' }}>
      <SideBar drawerWidth={240} />
      {/* main */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Typography paragraph>right</Typography>
      </Box>
    </Box>
  );
}
