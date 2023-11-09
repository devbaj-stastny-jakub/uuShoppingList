import {createTheme, ThemeOptions} from '@mui/material/styles';

export const themeOptions: ThemeOptions = {
    palette: {
        mode: 'light',
        primary: {
            main: '#CC0030',
        },
        secondary: {
            main: '#CC0030',
        },
        background: {
            default: '#f7f7f7',
        },
        text: {
            primary: '#322F35',
            secondary: '#aaaaaa',
            disabled: '#c3c3c3',
        },
    },
};

export const theme = createTheme(themeOptions)
