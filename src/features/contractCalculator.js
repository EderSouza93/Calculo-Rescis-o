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
        message: "Insira dados válidos.",
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

    if (allowanceDays <= 0) {
      return {
        success: true,
        message: `O inquilino usufluiu do imóvel por ${diffDays} dias desde o último vencimento e terá que pagar o proporcional de ${formatters.toCurrency(
          proportionalValue
        )}`,
      };
    }

    return {
      success: true,
      message: `O inquilino usufluiu do imóvel por ${diffDays} dias desde o último vencimento e teve um abono de ${allowanceDays} dias, portanto terá que pagar o proporcional de ${formatters.toCurrency(
        proportionalValue
      )}`,
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
        message: "Insira dados válidos.",
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

    return {
      success: true,
      message: `O inquilino utilizou ${diffDays} dias do seu contrato de ${contractDurationText}, por isso reincidirá multa de ${formatters.toCurrency(
        totalFineTerminator
      )} em seu boleto final.`,
    };
  },

  calculateEnergy(readingDate, endDate, energyValue) {
    const readingDateObj = new Date(readingDate);
    const endDateObj = new Date(endDate);

    // Validações
    if (
      isNaN(readingDateObj.getTime()) ||
      isNaN(endDateObj.getTime()) ||
      isNaN(energyValue) ||
      energyValue <= 0
    ) {
      return {
        success: false,
        message: "Insira dados válidos.",
      };
    }

    if (endDateObj < readingDateObj) {
      return {
        success: false,
        message:
          "Data de leitura inválida, verifique as datas de finalização de contrato e da última leitura de energia.",
      };
    }

    const diffDays = dateUtils.daysBetween(readingDateObj, endDateObj) + 1;
    const proportionalValue = (energyValue / 30) * diffDays;

    if (diffDays > 31) {
      return {
        success: false,
        message: "Data de leitura muito antiga, verifique a ultima medição!",
      };
    }

    // Evita NaN no resultado
    if (isNaN(proportionalValue) || proportionalValue < 0) {
      return {
        success: false,
        message: "Erro no cálculo. Verifique os dados inseridos!.",
      };
    }

    return {
      success: true,
      message: `O inquilino consumiu ${diffDays} dias de energia após a última leitura e o proporcional é ${formatters.toCurrency(
        proportionalValue
      )}`,
    };
  },

  calculateWater(readingDate, endDate, waterValue) {
    const readingDateObj = new Date(readingDate);
    const endDateObj = new Date(endDate);

    // Validações
    if (
      isNaN(readingDateObj.getTime()) ||
      isNaN(endDateObj.getTime()) ||
      isNaN(waterValue) ||
      waterValue <= 0
    ) {
      return {
        success: false,
        message: "Insira dados válidos.",
      };
    }

    if (endDateObj < readingDateObj) {
      return {
        success: false,
        message:
          "Data de leitura inválida, verifique as datas de finalização de contrato e da última leitura de energia.",
      };
    }

    const diffDays = dateUtils.daysBetween(readingDateObj, endDateObj) + 1;
    const proportionalValue = (waterValue / 30) * diffDays;

    if (diffDays > 31) {
      return {
        success: false,
        message: "Data de leitura muito antiga, verifique a ultima medição!",
      };
    }

    // Evita NaN no resultado
    if (isNaN(proportionalValue) || proportionalValue < 0) {
      return {
        success: false,
        message: "Erro no cálculo. Verifique os dados inseridos.",
      };
    }

    return {
      success: true,
      message: `O inquilino consumiu ${diffDays} dias de água após a última leitura e o proporcional é ${formatters.toCurrency(
        proportionalValue
      )}`,
    };
  },

  calculateCondominium(condominiumValue, condominiumPay, endDate) {
    const endDateObj = new Date(endDate);
    const firstDay = dateUtils.firstDayMonth();

    // Validações
    if (
      isNaN(endDateObj.getTime()) ||
      isNaN(condominiumValue) ||
      condominiumValue <= 0
    ) {
      return {
        success: false,
        message: "Insira dados válidos",
      };
    }

    // Calculo
    const diffDays = dateUtils.daysBetween(firstDay, endDateObj) + 1;
    const proportionalValue = (condominiumValue / 30) * diffDays;
    const condominiumToPay = proportionalValue - condominiumPay;

    // Evita NaN no resultado
    if (isNaN(condominiumToPay)) {
      return {
        success: false,
        message: "Insira dados válidos.",
      };
    }

    //Tratando problemas de ponto flutuante da primeira versão
    const tolarance = 0.01;

    if (isNaN(condominiumPay) || condominiumPay === 0) {
      return {
        success: true,
        message: `O inquilino utilizou ${diffDays} dias do condomínio sem pagar e tem uma proporcionalidade de ${formatters.toCurrency(
          condominiumToPay
        )} a pagar! `,
      };
    }

    if (Math.abs(condominiumToPay) < tolarance) {
      return {
        success: true,
        message: `O inquilino utilizou ${diffDays} dias de condomínio e efetuou o pagamento exato de sua proporcionalidade!`,
      };
    }

    if (condominiumToPay < 0) {
      return {
        success: true,
        message: `O inquilino utilizou ${diffDays} dias do condomínio e efetuou pagamento, então ele terá ${formatters.toCurrency(
          Math.abs(condominiumToPay)
        )} a ser ressarcido`,
      };
    }

    if (condominiumToPay > 0) {
      return {
        success: true,
        message: `O inquilino utilizou ${diffDays} dias do condomínio e efetuou o pagamento, porém tem uma proporcionalidade de ${formatters.toCurrency(
          Math.abs(condominiumToPay)
        )} a pagar!`,
      };
    }
  },

  calculateIPTU(iptuValue, iptuPay, startDate, endDate) {
    console.log("inicio da função");
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);

    // Validações
    if (
      isNaN(startDateObj.getTime()) ||
      isNaN(endDateObj.getTime()) ||
      isNaN(iptuValue) ||
      iptuValue <= 0 
    ) {
      return {
        success: false,
        message: "Insira dados válidos.",
      };
    }

    const currentDate = dateUtils.firstDayYear();
    let diffDaysIptu = (currentDate < startDate) 
      ? dateUtils.daysBetween(startDate, endDate) + 1
      : dateUtils.daysBetween(currentDate, endDate) + 1

      console.log(`Passo pela condicional, diferença de dia é igual a ${diffDaysIptu}`)

    // Calculo
    const proporcionalIptu = (iptuValue / 365) * diffDaysIptu;
    const totalIptu = proporcionalIptu - iptuPay;

    // Evita NaN no resultado
    if (isNaN(totalIptu)) {
      return {
        success: false,
        message: "Insira dados válidos.",
      };
    }

    const currentYear = new Date().getFullYear();

    //Tratando problemas de ponto flutuante da primeira versão
    const tolarance = 0.01;

    if (isNaN(iptuPay) || iptuPay === 0) {
      return {
        success: true,
        message: `O inquilino não efetuou nenhum pagamento referente ao ano de ${currentYear}, utilizou ${diffDaysIptu} dias e terá uma proporcionalide de ${formatters.toCurrency(Math.abs(totalIptu))} a pagar.`,
      };
    }

    if (Math.abs(totalIptu) < tolarance) {
      return {
        success: true,
        message: `O inquilino utilizou ${diffDaysIptu} dias do IPTU referente ao ano ${currentYear} e efetuou o pagamento exato de sua proporcionalidade.`,
      };
    }

    if (totalIptu < 0) {
      return {
        success: true,
        message: `O inquilino utilizou ${diffDaysIptu} dias do IPTU referente ao ano ${currentYear} e efetuou pagamento, então ele terá ${formatters.toCurrency(Math.abs(totalIptu))} a ser ressarcido.`,
      };
    }

    if (totalIptu > 0) {
      return {
        success: true,
        message: `O inquilino utilizou ${diffDaysIptu} dias do IPTU referente ao ano ${currentYear} e efetuou o pagamento, porém tem uma proporcionalidade de ${formatters.toCurrency(Math.abs(totalIptu))} a pagar.`,
      };
    }
  },
  calculateSPU(spuValue, spuPay, startDate, endDate) {
    console.log("inicio da função");
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);

    // Validações
    if (
      isNaN(startDateObj.getTime()) ||
      isNaN(endDateObj.getTime()) ||
      isNaN(spuValue) ||
      spuValue <= 0 
    ) {
      return {
        success: false,
        message: "Insira dados válidos.",
      };
    }

    const currentDate = dateUtils.firstDayYear();
    let diffDaysSpu = (currentDate < startDate) 
      ? dateUtils.daysBetween(startDate, endDate) + 1
      : dateUtils.daysBetween(currentDate, endDate) + 1

      console.log(`Passo pela condicional, diferença de dia é igual a ${diffDaysSpu}`)

    // Calculo
    const proporcionalSpu = (spuValue / 365) * diffDaysSpu;
    const totalSpu = proporcionalSpu - spuPay;

    // Evita NaN no resultado
    if (isNaN(totalSpu)) {
      return {
        success: false,
        message: "Insira dados válidos.",
      };
    }

    const currentYear = new Date().getFullYear();

    //Tratando problemas de ponto flutuante da primeira versão
    const tolarance = 0.01;

    if (isNaN(spuPay) || spuPay === 0) {
      return {
        success: true,
        message: `O inquilino não efetuou nenhum pagamento referente ao ano de ${currentYear}, utilizou ${diffDaysSpu} dias e terá uma proporcionalide de ${formatters.toCurrency(Math.abs(totalSpu))} a pagar.`,
      };
    }

    if (Math.abs(totalSpu) < tolarance) {
      return {
        success: true,
        message: `O inquilino utilizou ${diffDaysSpu} dias do SPU referente ao ano ${currentYear} e efetuou o pagamento exato de sua proporcionalidade.`,
      };
    }

    if (totalSpu < 0) {
      return {
        success: true,
        message: `O inquilino utilizou ${diffDaysSpu} dias do SPU referente ao ano ${currentYear} e efetuou pagamento, então ele terá ${formatters.toCurrency(Math.abs(totalSpu))} a ser ressarcido.`,
      };
    }

    if (totalSpu > 0) {
      return {
        success: true,
        message: `O inquilino utilizou ${diffDaysSpu} dias do SPU referente ao ano ${currentYear} e efetuou o pagamento, porém tem uma proporcionalidade de ${formatters.toCurrency(Math.abs(totalSpu))} a pagar.`,
      };
    }
  },
};
