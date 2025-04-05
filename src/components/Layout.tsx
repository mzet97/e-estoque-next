'use client';

import * as React from 'react';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import MiniVariantAppBar from './MiniVariantAppBar';
import MiniVariantDrawer from './MiniVariantDrawer';

const drawerWidth = 240;

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const closedDrawerWidth = `calc(${theme.spacing(7)} + 1px)`;

  return (
    <Box sx={{ display: 'flex' }}>
      <MiniVariantAppBar open={open} onMenuClick={handleDrawerOpen}>
        E-Chamado
      </MiniVariantAppBar>
      <MiniVariantDrawer open={open} onClose={handleDrawerClose} />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          ml: open ? `${drawerWidth}px` : closedDrawerWidth,
          transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }}
      >
        <Box sx={{ ...theme.mixins.toolbar }} />
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
