import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import minMax from 'dayjs/plugin/minMax';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import quarterOfYear from 'dayjs/plugin/quarterOfYear';
import objectSupport from 'dayjs/plugin/objectSupport';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isBetween from 'dayjs/plugin/isBetween';
import 'dayjs/locale/ru';

dayjs.locale('ru');
dayjs.extend(duration);
dayjs.extend(minMax);
dayjs.extend(weekOfYear);
dayjs.extend(quarterOfYear);
dayjs.extend(objectSupport);
dayjs.extend(isSameOrAfter);
dayjs.extend(isBetween);

dayjs.extend((_, dayjsClass) => {
    const oldFormat = dayjsClass.prototype.format;

    dayjsClass.prototype.format = function (formatString) {
        return oldFormat.bind(this)(formatString ?? 'YYYY-MM-DD');
    };
});

export enum DateFormat {
    DDMMYYYY = 'DD.MM.YYYY',
    DDMMYYYYHHmm = 'DD.MM.YYYY HH:mm',
}
