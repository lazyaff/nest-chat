export const horoscopeSigns = function (date: Date) {
  return [
    {
      start: new Date(date.getFullYear(), 0, 1),
      end: new Date(date.getFullYear(), 0, 19),
      sign: 'Capricorn',
    },
    {
      start: new Date(date.getFullYear(), 0, 20),
      end: new Date(date.getFullYear(), 1, 18),
      sign: 'Aquarius',
    },
    {
      start: new Date(date.getFullYear(), 1, 19),
      end: new Date(date.getFullYear(), 2, 20),
      sign: 'Pisces',
    },
    {
      start: new Date(date.getFullYear(), 2, 21),
      end: new Date(date.getFullYear(), 3, 19),
      sign: 'Aries',
    },
    {
      start: new Date(date.getFullYear(), 3, 20),
      end: new Date(date.getFullYear(), 4, 20),
      sign: 'Taurus',
    },
    {
      start: new Date(date.getFullYear(), 4, 21),
      end: new Date(date.getFullYear(), 5, 20),
      sign: 'Gemini',
    },
    {
      start: new Date(date.getFullYear(), 5, 21),
      end: new Date(date.getFullYear(), 6, 22),
      sign: 'Cancer',
    },
    {
      start: new Date(date.getFullYear(), 6, 23),
      end: new Date(date.getFullYear(), 7, 22),
      sign: 'Leo',
    },
    {
      start: new Date(date.getFullYear(), 7, 23),
      end: new Date(date.getFullYear(), 8, 22),
      sign: 'Virgo',
    },
    {
      start: new Date(date.getFullYear(), 8, 23),
      end: new Date(date.getFullYear(), 9, 22),
      sign: 'Libra',
    },
    {
      start: new Date(date.getFullYear(), 9, 23),
      end: new Date(date.getFullYear(), 10, 21),
      sign: 'Scorpio',
    },
    {
      start: new Date(date.getFullYear(), 10, 22),
      end: new Date(date.getFullYear(), 11, 21),
      sign: 'Sagittarius',
    },
    {
      start: new Date(date.getFullYear(), 11, 22),
      end: new Date(date.getFullYear(), 11, 31),
      sign: 'Capricorn',
    },
  ];
};
