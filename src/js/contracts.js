 export class Contract {
    constructor(startDate, endDate, rentAmount, tenantName, tenantCode ) {
        this.startDate = new Date(startDate);
        this.endDate = new Date(endDate);
        this.rentAmount = parseFloat(rentAmount);
        this.tenantName = tenantName;
        this.tenantCode = tenantCode;
    };

    getTenantData() {
    return {
        name: this.tenantName,
        code: this.tenantCode
    }
    };

    getDuration() {
        const diffTime = Math.abs(this.endDate - this.startDate);
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    };

    getRentPerDay(){
        return this.rentAmount / 30;
    };

    getProportionalRent(paymentDate, allowance = 0) {
        const diffTime = Math.abs(paymentDate - this.endDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24) + 1);
        const proportionalValue = (this.getRentPerDay() * (diffDays - allowance));
        return proportionalValue;
    };

    getFineTerminator(terminalFineValue) {
        const nonUseDays = terminalFineValue - this.getDuration();
        const totalFineTerminator = (3 * this.rentAmount * nonUseDays) / terminalFineValue;
        return totalFineTerminator;
    };
    
    

    /*getFirstDay(){
        const date = new Date();
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        console.log(firstDay);
        return firstDay
    }*/
  
};

export default Contract;
