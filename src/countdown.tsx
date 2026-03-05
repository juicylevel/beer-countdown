import { Stack, Typography } from '@mui/material';
import { useCountDown } from './use-count-down';

export const Countdown = () => {
    const searchParams: URLSearchParams = new URLSearchParams(
        window.location.search,
    );

    const deadline = searchParams.get('deadline') ?? '';
    const title = searchParams.get('title');
    const message = searchParams.get('message');

    const countdown = useCountDown({
        deadline,
        format: ['hours', 'minutes', 'seconds'],
        short: true,
    });

    return (
        <Stack
            alignItems="center"
            justifyContent="center"
            gap={3}
            height="100%"
        >
            {title && (
                <Typography variant="h1" color="secondary">
                    {title}
                </Typography>
            )}
            <Typography
                variant="h2"
                sx={{ fontVariantNumeric: 'tabular-nums' }}
            >
                {countdown}
            </Typography>
            {message && <Typography variant="h5">{message}</Typography>}
        </Stack>
    );
};
