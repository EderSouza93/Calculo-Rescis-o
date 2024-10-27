import { formatters } from "../utils/formatters.js";
import { dateUtils } from "../utils/dates.js";

export const contractCalculator = {
  calculateProportionalRent(rentDate, endDate, rentValue, allowanceDays = 0) {
    //converte datas para objetos Date, caso não sejam
    const rentDateObj = new Date(rentDate);
    const endDateObj = new Date(endDate);

    // Validações
    if (
      isNaN(rentDateObj.getTime()) ||
      isNaN(endDateObj.getTime()) ||
      isNaN(rentValue) ||
      rentValue <= 0
    ) {
      return {
        success: false,
        message: "Insira dados válidos",
      };
    }

    if (endDateObj < rentDateObj) {
      return {
        success: false,
        message:
          "Dados inválidos, verifique as datas de finalização de contrato e do último vencimento do aluguel.",
      };
    }

    const diffDays = dateUtils.daysBetween(rentDateObj, endDateObj) + 1; // +1 para incluir o último dia

    if (diffDays > 32) {
      return {
        success: false,
        message:
          "Dados inválidos, verifique a data do último vencimento do aluguel",
      };
    }

    // Cálculo do valor proporcional
    const proportionalValue = (rentValue / 30) * (diffDays - allowanceDays);

    // Evita NaN no resultado
    if (isNaN(proportionalValue) || proportionalValue < 0) {
      return {
        success: false,
        message: "Erro no cálculo. Verifique os dados inseridos.",
      };
    }

    // Formatação da mensagem de resposta
    const formattedValue = formatters.toCurrency(proportionalValue);

    if (allowanceDays <= 0) {
      return {
        success: true,
        message: `O inquilino usufluiu do imóvel por ${diffDays} dias desde o último vencimento e terá que pagar o proporcional de ${formattedValue}`,
      };
    }

    return {
      success: true,
      message: `O inquilino usufluiu do imóvel por ${diffDays} dias desde o último vencimento e teve um abono de ${allowanceDays} dias, portanto terá que pagar o proporcional de ${formattedValue}`,
    };
  },

  calculateTerminatorFine(
    startDate,
    endDate,
    rentValue,
    contractDuration,
    contractDurationText
  ) {
    // Converte datas para objetos Date
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);

    // Validações
    if (
      isNaN(startDateObj.getTime()) ||
      isNaN(endDateObj.getTime()) ||
      isNaN(rentValue) ||
      rentValue <= 0
    ) {
      return {
        success: false,
        message: "Insira dados válidos",
      };
    }

    // Cálculo de dias de uso
    const diffDays = dateUtils.daysBetween(startDateObj, endDateObj) + 1;

    if (diffDays >= contractDuration) {
      return {
        success: false,
        message: "O contrato não possui multa rescisória.",
      };
    }

    // Cálculo da multa rescisória
    const notUseDays = contractDuration - diffDays;
    const totalFineTerminator = (3 * rentValue * notUseDays) / contractDuration;

    // Validação NaN
    if (isNaN(totalFineTerminator) || totalFineTerminator < 0) {
      return {
        success: false,
        message: "Erro no cálculo da multa. Verifique os dados inseridos.",
      };
    }

    const formattedFine = formatters.toCurrency(totalFineTerminator);

    return {
      success: true,
      message: `O inquilino utilizou ${diffDays} dias do seu contrato de ${contractDurationText}, por isso reincidirá multa de ${formattedFine} em seu boleto final.`,
    };
  },
};
