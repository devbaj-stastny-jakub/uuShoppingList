import {createTheme, ThemeOptions} from '@mui/material/styles';

export const themeOptionsLight: ThemeOptions = {
    palette: {
        mode: 'light',
        primary: {
            main: '#CC0030',
            dark: "#322F35",
            light: "#c5c5c5"
        },
        secondary: {
            main: '#CC0030',
        },
        background: {
            default: '#f7f7f7',
            paper: "#efefef"
        },
        text: {
            primary: '#322F35',
            secondary: '#aaaaaa',
            disabled: '#c3c3c3',
        },
    },
};
export const themeOptionsDark: ThemeOptions = {
    palette: {
        mode: 'dark',
        primary: {
            main: '#CC0030',
            dark: "#201f23",
            light: "#c5c5c5"
        },
        secondary: {
            main: '#CC0030',
        },
        background: {
            default: '#322F35',
            paper: "#221f23"
        },
        text: {
            primary: '#f3f3f3',
            secondary: '#aaaaaa',
            disabled: '#c3c3c3',
        },
    },
};
