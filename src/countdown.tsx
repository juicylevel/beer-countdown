import { Stack, Typography } from '@mui/material';
import { useCountDown } from './use-count-down';
import { BeerMugsSnow } from './beer-mugs-snow';

export const Countdown = () => {
    const searchParams: URLSearchParams = new URLSearchParams(
        window.location.search,
    );

    const deadline = searchParams.get('deadline') ?? '';
    const title = searchParams.get('title') ?? 'Title';
    const message = searchParams.get('message') ?? "Let's go drink beer!";

    const countdown = useCountDown({
        deadline,
        format: ['hours', 'minutes', 'seconds'],
        short: true,
        onComplete: () => alert('Время истекло!'),
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
            <BeerMugsSnow />
        </Stack>
    );
};
