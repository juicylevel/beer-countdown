import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './theme';
import './dayjs.config';
import { Countdown } from './countdown';

export const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Countdown />
        </ThemeProvider>
    );
};

export default App;
