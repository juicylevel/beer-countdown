import { CssBaseline, Stack, ThemeProvider, Typography } from '@mui/material';
import theme from './theme';
import './dayjs.config';
import { useCountDown } from './use-count-down';

export const App = () => {
    const countdown = useCountDown({ deadline: '2026-03-05T18:00:00' });
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Stack alignItems="center" justifyContent="center" height="100%">
                <Typography variant="h2">{countdown}</Typography>
            </Stack>
        </ThemeProvider>
    );
};

export default App;
