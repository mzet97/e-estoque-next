'use client';

import * as React from 'react';
import { styled } from '@mui/material/styles';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Box, Button, Stack } from '@mui/material';
import { useRouter } from 'next/navigation';
import ThemeSwitcher from './ThemeSwitcher';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
  onMenuClick: () => void;
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const MiniVariantAppBar: React.FC<AppBarProps> = ({
  open,
  onMenuClick,
  children,
  ...rest
}) => {
  const router = useRouter();
  const { data: session, status } = useSession();

  const handleSignOut = () => {
    signOut({ redirect: true, redirectTo: '/auth/signIn' });
    router.push('/');
  };

  return (
    <AppBar onMenuClick={onMenuClick} position="fixed" open={open} {...rest}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={onMenuClick}
          edge="start"
          sx={{
            marginRight: 5,
            ...(open && { display: 'none' }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          {children}
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

        <Stack direction="row" spacing={2}>
          {!session && status !== 'loading' && (
            <>
              <Button
                variant="contained"
                color="success"
                onClick={() => router.push('/auth/signIn')}
              >
                Sign in
              </Button>
              <Button
                variant="contained"
                color="warning"
                onClick={() => router.push('/auth/signUp')}
              >
                Sign up
              </Button>
            </>
          )}
          {session && status === 'authenticated' && (
            <>
              <Button
                variant="contained"
                color="error"
                onClick={() => handleSignOut()}
              >
                Sign up
              </Button>
            </>
          )}

          <ThemeSwitcher />
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default MiniVariantAppBar;
