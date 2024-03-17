import Contract from "./contracts";

export const calculateRentBill = (contractEndDate, billRent, datePayRent, allowance) => {
    const contract = new Contract(null, contractEndDate, billRent);
    const proportionalValue = contract.getProportionalRent(datePayRent, allowance);
    return proportionalValue;
}

export const calculateFineTerminator = (contractEndDate, startContract, billRent, terminalFineValue) => {
    const contract = new Contract(startContract, contractEndDate, billRent);
    const totalFineTerminator = contract.getFineTerminator(terminalFineValue);
    return totalFineTerminator;
}