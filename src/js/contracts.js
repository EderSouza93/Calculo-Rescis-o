class Contract {
    constructor(startDate, endDate, retAmount) {
        this.startDate = new Date(startDate);
        this.endDate = new Date(endDate);
        this.retAmount = parseFloat(retAmount);
    };

    getDuration() {
        const diffTime = Math.abs(this.endDate - this.startDate);
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24) + 1);
    };

    getRentPerDay(){
        return this.retAmount / 30;
    };

    getProportionalRent(paymentDate, allowance = 0) {
        const diffTime = Math.abs(paymentDate - this.endDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24) + 1);
        const proportionalValue = (this.getRentPerDay() * (diffDays - allowance));
        return proportionalValue;
    };

    getFineTerminator(terminalFineValue) {
        const nonUseDays = terminalFineValue - this.getDuration();
        const totalFineTerminator = (3 * this.retAmount * nonUseDays) / terminalFineValue;
        return totalFineTerminator;
    };
};

export default Contract;
