import { amber, deepOrange, grey } from '@mui/material/colors';
import { PaletteOptions, createTheme, css } from '@mui/material/styles';
import { Roboto } from 'next/font/google';
export type AllowedTheme = NonNullable<PaletteOptions['mode']>;

export const DEFAULT_THEME: AllowedTheme = 'dark';

export const roboto = Roboto({
    weight: ['300', '400', '500', '700'],
    subsets: ['latin'],
    display: 'swap',
    fallback: ['Helvetica', 'Arial', 'sans-serif'],
});

export const lightTheme = createTheme({
    palette: {
        primary: { main: '#5b7bb2' },
        secondary: { main: '#81ac8d' },
        mode: 'light',
        text: {
            primary: grey[900],
            secondary: grey[800],
        },
        divider: amber[200],
        background: {
            default: grey[100],
            paper: grey[100],
        },
    },
    typography: {
        fontFamily: roboto.style.fontFamily,
    },
});

export const darkTheme = createTheme({
    palette: {
        primary: { main: '#093170' },
        secondary: { main: '#487e4c' },
        mode: 'dark',
        text: {
            primary: '#fff',
            secondary: grey[500],
        },
        background: {
            default: grey[900],
            paper: grey[900],
        },
    },
    typography: {
        fontFamily: roboto.style.fontFamily,
    },
});
