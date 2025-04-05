'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import { useTheme } from '@mui/material/styles';
import { ColorModeContext } from '../../theme/ColorModeProvider';

export default function ThemeSwitcher() {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      {theme.palette.mode === 'dark' ? (
        <Brightness4Icon />
      ) : (
        <Brightness7Icon />
      )}
      <Switch
        checked={theme.palette.mode === 'dark'}
        onChange={colorMode.toggleColorMode}
        inputProps={{ 'aria-label': 'theme toggle' }}
      />
    </Box>
  );
}
