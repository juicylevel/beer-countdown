export type TimeUnitTitles = [string, string, string];

// titles example: ['балл', 'балла', 'баллов']

export const declOfNum = (number: number, titles: TimeUnitTitles) => {
    const cases = [2, 0, 1, 1, 1, 2];
    return titles[
        number % 100 > 4 && number % 100 < 20
            ? 2
            : cases[number % 10 < 5 ? number % 10 : 5]
    ];
};
