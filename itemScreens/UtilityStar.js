export const getCorrectRating = rate => Math.floor(rate >= 2 ? rate / 2 : rate);

export const getDigits = rate => parseFloat(rate).toFixed(1);
