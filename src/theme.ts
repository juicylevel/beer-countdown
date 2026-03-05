import { createTheme, responsiveFontSizes } from '@mui/material/styles';

let theme = createTheme({
    colorSchemes: {
        dark: true,
    },
    defaultColorScheme: 'dark',
    typography: {
        fontFamily: 'Roboto Slab, sans-serif',
        subtitle2: {
            fontSize: '1rem',
        },
    },
    components: {
        MuiAlert: {
            styleOverrides: {
                filledWarning: {
                    fontSize: '20px',
                },
                outlinedWarning: {
                    fontSize: '20px',
                },
                filledInfo: {
                    fontSize: '20px',
                },
                outlinedInfo: {
                    fontSize: '20px',
                },
                filledError: {
                    fontSize: '20px',
                },
                outlinedError: {
                    fontSize: '20px',
                },
                filledSuccess: {
                    fontSize: '20px',
                },
                outlinedSuccess: {
                    fontSize: '20px',
                },
            },
            defaultProps: {
                icon: false,
            },
        },
    },
});

theme = responsiveFontSizes(theme);

export default theme;
