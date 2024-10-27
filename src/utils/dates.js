export const dateUtils = {
    daysBetween(startDate, endDate) {
        const diffTime = Math.abs(endDate - startDate);
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    },

    firstDayMonth() {
        const date = new Date();
        return new Date(date.getFullYear(), date.getMonth(), 1);
    },

    firstDayYear() {
        const currentYear = new Date().getFullYear();
        return new Date(`January 01 ${currentYear}`);
    },
};
 