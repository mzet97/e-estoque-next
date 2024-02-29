import React from 'react';

import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';

export const ColorModeContext = React.createContext({
    toggleColorMode: () => {},
});

const SwitchTheme: React.FC = () => {
    const theme = useTheme();
    const colorMode = React.useContext(ColorModeContext);
    return (
        <div>
            <IconButton
                sx={{ ml: 1 }}
                onClick={colorMode.toggleColorMode}
                color="inherit"
            >
                {theme.palette.mode === 'dark' ? (
                    <Brightness7Icon />
                ) : (
                    <Brightness4Icon />
                )}
            </IconButton>
        </div>
    );
};

export default SwitchTheme;
