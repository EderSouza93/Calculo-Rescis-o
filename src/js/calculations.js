import Contract from "./contracts.js"
import UtilityBill from "./utility-bill.js"

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

export const calculateCondominium = (condBillValue, condominiumPayment, contractEndDate) => {
    const condominium = new Contract(condBillValue, contractEndDate);
    const proportionalValue = condominium.getFirstDay() - contractEndDate;


}

export const calculateWater = (contractEndDate, waterBillValue, waterReadingDate) => {
    const waterBill = new UtilityBill(waterBillValue, waterReadingDate, 30);
    const proportionalValue = waterBill.getProportionalBill(contractEndDate);
    // ... (restante da lógica de cálculo)
    return proportionalValue;
};

export const calculateEnergy = (contractEndDate, energyBillValue, energyReadingDate) => {
    const energyBill = new UtilityBill(energyBillValue, energyReadingDate, 30);
    const proportionalValue = energyBill.getProportionalBill(contractEndDate);
    // ... (restante da lógica de cálculo)
    return proportionalValue;
};