import Contract from "./contracts.js"
import UtilityBill from "./utility-bill.js"
import { getDaysDifference } from "./utils.js";

export const calculateRentBill = (contractEndDate, rentAmount, datePayRent, allowance) => {
    const contract = new Contract(null, contractEndDate, rentAmount);
    const proportionalValue = contract.getProportionalRent(datePayRent, allowance);
    return proportionalValue;
}

export const calculateExtraRentDays = (contractEndDate, lastPaymentDate) => {
    const endDate = new Date(contractEndDate);
    const lastPayment = new Date(lastPaymentDate);
    const extraDays = getDaysDifference(lastPayment, endDate);
    return extraDays
}

export const calculateFineTerminator = (contractEndDate, startContract, rentAmount, terminalFineValue) => {
    const contract = new Contract(startContract, contractEndDate, rentAmount);
    const totalFineTerminator = contract.getFineTerminator(terminalFineValue);
    return { error: null, totalFineTerminator };
    
}

export const calculateCondominium = (condBillValue, condominiumPayment, contractEndDate) => {
    const condominium = new Contract(condBillValue, contractEndDate);
    const proportionalValue = condominium.getFirstDay() - contractEndDate;


}

export const calculateWater = (contractEndDate, waterBillValue, waterReadingDate) => {
    const waterBill = new UtilityBill(waterBillValue, waterReadingDate, 30);
    const proportionalValue = waterBill.getProportionalBill(contractEndDate);
    // ... (restante da lógica de cálculo)
    return { error: null, proportionalValue };
};

export const calculateEnergy = (contractEndDate, energyBillValue, energyReadingDate) => {
    const energyBill = new UtilityBill(energyBillValue, energyReadingDate, 30);
    const proportionalValue = energyBill.getProportionalBill(contractEndDate);
    // ... (restante da lógica de cálculo)
    return proportionalValue;
};

