// DOM variables
const contractEndDateInput = document.getElementById("date-end");
const billRentInput = document.getElementById("rent-bill-value");
const datePayRentInput = document.getElementById("rent-payment-date");
const resultRent = document.getElementById("result-rent");
const dayAllowance = document.getElementById("day-allowance");
const calculatedBtnRent = document.getElementById("calculated-rent");
const waterBillValueInput = document.getElementById("water-bill-value");
const waterReadingDateInput = document.getElementById("water-reading-date");
const resultWater = document.getElementById("result-water");
const differenceDaysWaterBtn = document.getElementById("difference-days-water");
const energyBillValueInput = document.getElementById("energy-bill-value");
const energyReadingDateInput = document.getElementById("energy-reading-date");
const resultEnergy = document.getElementById("result-energy");
const differenceDaysEnergyBtn = document.getElementById(
  "difference-days-energy"
);
const condominiumBillValueInput = document.getElementById(
  "condominium-bill-value"
);
const condominiumPaymentInput = document.getElementById("condominium-payment");
const calculateCondominiumBtn = document.getElementById(
  "difference-days-condominuim"
);
const resultCondominium = document.getElementById("result-condominium");
const iptuBillValueInput = document.getElementById("iptu-bill-value");
const iptuPaymentInput = document.getElementById("iptu-payment");
const resultIptu = document.getElementById("result-iptu");
const calculateIptuBtn = document.getElementById("difference-days-iptu");
const spuBillValueInput = document.getElementById("spu-bill-value");
const spuPaymentInput = document.getElementById("spu-payment");
const calculateSpuBtn = document.getElementById("difference-days-spu");
const resultSpu = document.getElementById("result-spu");

// Função de calculo de aluguel
const calculateRentBill = () => {
  const contractEndDate = contractEndDateInput.value;
  const billRent = billRentInput.value;
  const datePayRent = datePayRentInput.value;

  const data1 = new Date(contractEndDate);
  const data2 = new Date(datePayRent);

  const diffTime = Math.abs(data2 - data1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24) + 1);

  let allowance = dayAllowance.options[dayAllowance.selectedIndex].value;
  let allowancetext = dayAllowance.options[dayAllowance.selectedIndex].text;
  const proportionalValue = (billRent / 30) * (diffDays - allowance);

  let proportionalValueCurrency = proportionalValue.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });

  if (contractEndDate === "" || billRent === "" || datePayRent === "") {
    resultRent.textContent = "Insira dados válidos";
  } else if (data1 < data2) {
    resultRent.textContent =
      "Dados inválidos, verifique as datas de finalização de contrato e do último vencimento do aluguel.";
  } else if (data2 < data1 && diffDays > 32) {
    resultRent.textContent =
      "Dados inválidos, verifique a data do último vencimento do aluguel";
  } else if (allowance <= 0) {
    resultRent.textContent = `O inquilino usufluiu do imóvel por ${diffDays} dias desde o último vencimento e terá que pagar o proporcional de ${proportionalValueCurrency}`;
  } else
    resultRent.textContent = `O inquilino usufluiu do imóvel por ${diffDays} dias desde o último vencimento e e teve um abono de ${allowancetext}, portanto terá que pagar o proporcional de ${proportionalValueCurrency}`;
};
calculatedBtnRent.addEventListener("click", calculateRentBill);

// Função Cálculo de Água
const calculateWater = () => {
  //manipulando os inputs
  const waterReadingDate = waterReadingDateInput.value;
  const waterBillValue = waterBillValueInput.value;
  const contractEndDate = contractEndDateInput.value;

  //convertendo as datas para objetos
  const data1 = new Date(contractEndDate);
  const data2 = new Date(waterReadingDate);

  const diffTime = Math.abs(data2 - data1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24) + 1);
  // Calculando o valor a ser ressarcido de água
  const valueWater = (waterBillValue / 30) * diffDays;

  let valueWaterCurrency = valueWater.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });

  if (
    contractEndDate === "" ||
    waterReadingDate === "" ||
    waterBillValue === ""
  ) {
    resultWater.textContent = "Insira Dados válidos";
  } else if (data2 > data1) {
    resultWater.textContent = "Data de leitura inválida";
  } else if (data2 < data1 && diffDays > 34) {
    resultWater.textContent = "Data de medição muito antiga";
  } else
    resultWater.textContent = `O inquilino consumiu ${diffDays} dias de água após a última leitura e o seu proporcional é ${valueWaterCurrency}`;
};

differenceDaysWaterBtn.addEventListener("click", calculateWater);

// Função de Cálculo de Energia
const calculateEnergy = () => {
  // manipulando os inputs
  const energyReadingDate = energyReadingDateInput.value;
  const energyBillValue = energyBillValueInput.value;
  const contractEndDate = contractEndDateInput.value;

  // convertendo as datas para objetos
  const data1 = new Date(contractEndDate);
  const data2 = new Date(energyReadingDate);

  // Calculando a diferença de datas
  const diffTime = Math.abs(data2 - data1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24) + 1);

  const valueEnergy = (energyBillValue / 30) * diffDays;

  let valueEnergyCurrency = valueEnergy.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });
  // Definindo um validador para cada data de vencimento específico
  if (
    contractEndDate === "" ||
    energyReadingDate === "" ||
    energyBillValue === ""
  ) {
    resultEnergy.textContent = "Insira dados válidos";
  } else if (data2 > data1) {
    resultEnergy.textContent = "Data de leitura inválida";
  } else if (data2 < data1 && diffDays > 34) {
    resultEnergy.textContent = "Data de medição muito antiga";
  } else
    resultEnergy.textContent = `O inquilino consumiu ${diffDays} dias  de energia após a última leitura e o seu proporcional é ${valueEnergyCurrency}`;
};
differenceDaysEnergyBtn.addEventListener("click", calculateEnergy);

// Função de Cálculo do condomínio
const calculateCondominium = () => {
  // Manipulando os inputs
  const condominiumBillValue = condominiumBillValueInput.value;
  const condominiumPayment = condominiumPaymentInput.value;
  const contractEndDate = contractEndDateInput.value;

  // Obtendo o primeiro dia do mês atual
  const date = new Date();
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);

  // convertendo as datas para objetos
  const data1 = new Date(contractEndDate);
  const data2 = new Date(firstDay);

  // Calculando a diferença de datas
  const diffTime = Math.abs(data2 - data1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24) + 1);

  // Calculando
  const valueCondominium = (condominiumBillValue / 30) * diffDays;
  const totalCondominium = valueCondominium - condominiumPayment;

  // Convertendo para a moeda local
  let totalCondominiumCurrency = totalCondominium.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });

  // mudando o sinal do valor atribuído na variável
  let convertValue = Math.abs(totalCondominium);

  let convertValueCurrency = convertValue.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });

  // definindo uma tolerância para evitar problemas com o ponto flotuante.
  const tolerance = 0.01;

  if (condominiumBillValue === "" || contractEndDate === "") {
    resultCondominium.textContent = "Insira dados válidos";
  } else if (condominiumPayment == "") {
    resultCondominium.textContent = `O inquilino utilizou ${diffDays} dias do condomínio sem pagar e tem uma proporcionalidade de ${totalCondominiumCurrency} a pagar! `;
  } else if (Math.abs(totalCondominium) < tolerance) {
    resultCondominium.textContent = `O inquilino utilizou ${diffDays} dias de condomínio e efetuou o pagamento exato de sua proporcionalidade!`;
  } else if (totalCondominium < 0) {
    resultCondominium.textContent = `O inquilino utilizou ${diffDays} dias do condomínio e efetuou pagamento, então ele terá ${convertValueCurrency} a ser ressarcido`;
  } else
    resultCondominium.textContent = `O inquilino utilizou ${diffDays} dias do condomínio e efetuou o pagamento, porém tem uma proporcionalidade de ${totalCondominiumCurrency} a pagar!`;
};
calculateCondominiumBtn.addEventListener("click", calculateCondominium);

// Função de Cálculo IPTU
const calculateIPTU = () => {
  const iptuBillValue = iptuBillValueInput.value;
  const iptuPayment = iptuPaymentInput.value;
  const contractEndDate = contractEndDateInput.value;

  const currentYear = new Date().getFullYear();
  const currentTime = new Date(`January 01 ${currentYear}`);

  const data1 = new Date(contractEndDate);
  const data2 = new Date(currentTime);

  const diffTime = Math.abs(data2 - data1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24) + 1);

  const valueIptu = (iptuBillValue / 365) * diffDays;
  const totalIptu = valueIptu - iptuPayment;

  let totalIptuCurrency = totalIptu.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });

  let convertValue = Math.abs(totalIptu);

  let convertValueCurrency = convertValue.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });

  // definindo uma tolerância para evitar problemas com o ponto flotuante.
  const tolerance = 0.01;

  if (contractEndDate === "" || iptuBillValue === "") {
    resultIptu.textContent = "Insira dados válidos";
  } else if (iptuPayment == "") {
    resultIptu.textContent = `O inquilino não efetuou nenhum pagamento referente ao ano de ${currentYear}, utilizou ${diffDays} dias e terá uma proporcionalide de ${totalIptuCurrency} a pagar!`;
  } else if (Math.abs(totalIptu) < tolerance) {
    resultIptu.textContent = `O inquilino utilizou ${diffDays} dias do IPTU referente ao ano ${currentYear} e efetuou o pagamento exato de sua proporcionalidade`;
  } else if (totalIptu < 0) {
    resultIptu.textContent = `O inquilino utilizou ${diffDays} dias do IPTU referente ao ano ${currentYear} e efetuou pagamento, então ele terá ${convertValueCurrency} a ser ressarcido`;
  } else
    resultIptu.textContent = `O inquilino utilizou ${diffDays} dias do IPTU referente ao ano ${currentYear} e efetuou o pagamento, porém tem uma proporcionalidade de ${totalIptuCurrency} a pagar!`;
};
calculateIptuBtn.addEventListener("click", calculateIPTU);

// Função de Cálculo SPU
const calculateSPU = () => {
  const spuBillValue = spuBillValueInput.value;
  const spuPayment = spuPaymentInput.value;
  const contractEndDate = contractEndDateInput.value;

  const currentYear = new Date().getFullYear();
  const currentTime = new Date(`January 01 ${currentYear}`);

  const data1 = new Date(contractEndDate);
  const data2 = new Date(currentTime);

  const diffTime = Math.abs(data2 - data1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24) + 1);

  const valueSpu = (spuBillValue / 365) * diffDays;
  const totalSpu = valueSpu - spuPayment;

  let totalSpuCurrency = totalSpu.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });

  let convertValue = Math.abs(totalSpu);

  let convertValueCurrency = convertValue.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });

  // definindo uma tolerância para evitar problemas com o ponto flotuante.
  const tolerance = 0.01;

  if (contractEndDate === "" || spuBillValue === "") {
    resultSpu.textContent = "Insira dados válidos";
  } else if (spuPayment == "") {
    resultSpu.textContent = `O inquilino não efetuou nenhum pagamento referente ao ano de ${currentYear}, utilizou ${diffDays} dias e terá uma proporcionalide de ${totalSpuCurrency} a pagar!`;
  } else if (Math.abs(totalSpu) < tolerance) {
    resultSpu.textContent = `O inquilino utilizou ${diffDays} dias do SPU referente ao ano ${currentYear} e efetuou o pagamento exato de sua proporcionalidade`;
  } else if (totalSpu < 0) {
    resultSpu.textContent = `O inquilino utilizou ${diffDays} dias do SPU referente ao ano ${currentYear} e efetuou pagamento, então ele terá ${convertValueCurrency} a ser ressarcido`;
  } else
    resultSpu.textContent = `O inquilino utilizou ${diffDays} dias do SPU referente ao ano ${currentYear} e efetuou o pagamento, porém tem uma proporcionalidade de ${totalSpuCurrency} a pagar!`;
};
calculateSpuBtn.addEventListener("click", calculateSPU);
