class UtilityBill {
    constructor(billValue, readingDate, billPeriod) {
        this.billValue = parseFloat(billValue);
        this.readingDate = new Date(readingDate);
        this.billPeriod = billPeriod; // Exemplo: 30 dias para água e energia, 365 dias para IPTU e SPU
    }

    getProportionalBill(contractEndDate) {
        const diffTime = Math.abs(this.readingDate - contractEndDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const proportionalValue = (this.billValue / this.billPeriod) * diffDays;
        return proportionalValue;
    }
}

export default UtilityBill;