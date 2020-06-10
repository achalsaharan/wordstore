import { createMuiTheme } from '@material-ui/core/styles';
import { green, orange } from '@material-ui/core/colors';

const theme = createMuiTheme({
    palette: {
        secondary: {
            main: '#e65100',
            light: '#ff833a',
            dark: '#ac1900',
            contrastText: '#ffffff',
        },
        primary: {
            main: '#1565c0',
            light: '#5e92f3',
            dark: '#003c8f',
        },
        text: {
            // primary: '#000000',
            // secondary: '#ffffff',
        },
    },
});

export default theme;
