import { useCallback, useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import { declOfNum, type TimeUnitTitles } from './decl-of-num';

type DayjsDuration = ReturnType<typeof dayjs.duration>;

export type TimeUnit = 'months' | 'days' | 'hours' | 'minutes' | 'seconds';

const SHORT_TITLES: Record<TimeUnit, string> = {
    months: 'мес',
    days: 'д',
    hours: 'ч',
    minutes: 'мин',
    seconds: 'с',
};

const TITLES: Record<TimeUnit, TimeUnitTitles> = {
    months: ['месяц', 'месяца', 'месяцев'],
    days: ['день', 'дня', 'дней'],
    hours: ['час', 'часа', 'часов'],
    minutes: ['минута', 'минуты', 'минут'],
    seconds: ['секунда', 'секунды', 'секунд'],
};

const getUnitValue = (d: DayjsDuration, unit: TimeUnit) => {
    switch (unit) {
        case 'months':
            return d.months();
        case 'days':
            return d.days();
        case 'hours':
            return d.hours();
        case 'minutes':
            return d.minutes();
        case 'seconds':
            return d.seconds();
    }
};

type UseCountDownOptions = {
    deadline: string;
    format?: TimeUnit[];
    short?: boolean;
    hideZero?: boolean;
    onComplete?: () => void;
};

const DEFAULT_FORMAT: TimeUnit[] = [
    'months',
    'days',
    'hours',
    'minutes',
    'seconds',
];

export const useCountDown = ({
    deadline,
    format = DEFAULT_FORMAT,
    short = false,
    hideZero = false,
    onComplete,
}: UseCountDownOptions) => {
    const [result, setResult] = useState<string | null>(null);
    const intervalRef = useRef<number>(0);

    const getDurationMs = useCallback(() => {
        const now = dayjs();
        const end = dayjs(deadline);
        return end.diff(now);
    }, [deadline]);

    const update = useCallback(
        (ms: number) => {
            if (ms <= 0) {
                setResult(null);
                return;
            }

            const d = dayjs.duration(ms);

            const parts = format
                .map((unit) => {
                    const value = getUnitValue(d, unit);

                    if (hideZero && value === 0) return null;

                    if (short) {
                        return `${value} ${SHORT_TITLES[unit]}`;
                    }

                    const title = declOfNum(value, TITLES[unit]);
                    return `${value} ${title}`;
                })
                .filter(Boolean);

            setResult(parts.join(' '));
        },
        [format, short, hideZero],
    );

    const tick = useCallback(() => {
        const ms = getDurationMs();

        if (ms > 0) {
            update(ms);
        } else {
            clearInterval(intervalRef.current);
            setResult(null);
            onComplete?.();
        }
    }, [getDurationMs, update, onComplete]);

    useEffect(() => {
        tick();
        intervalRef.current = window.setInterval(tick, 1000);

        return () => clearInterval(intervalRef.current);
    }, [tick]);

    return result;
};
