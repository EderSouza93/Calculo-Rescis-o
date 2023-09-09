// DOM variables
const contractEndDateInput = document.getElementById("date-end");
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

// Função Cálculo de Água
const differenceBetweenDaysWater = () => {
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

  if (data2 > data1) {
    resultWater.textContent = "Data de leitura inválida";
  } else if (data2 < data1 && diffDays > 60) {
    resultEnergy.textContent = "Data de medição muito antiga";
  } else resultWater.textContent = `O inquilino consumiu ${diffDays} dias de água após o vencimento e o seu proporcional é ${valueWaterCurrency}`;

};

differenceDaysWaterBtn.addEventListener("click", differenceBetweenDaysWater);

// Função de Cálculo de Energia
const differenceBetweenDaysEnergy = () => {
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
  if (data2 > data1) {
    resultEnergy.textContent = "Data de leitura inválida";
  } else if (data2 < data1 && diffDays > 60) {
    resultEnergy.textContent = "Data de medição muito antiga";
  } else
    resultEnergy.textContent = `O inquilino consumiu ${diffDays} dias  de energia após o vencimento e o seu proporcional é ${valueEnergyCurrency}`;

  console.log(diffDays);
  console.log(valueEnergy);
  console.log(typeof valueEnergyCurrency);
};
differenceDaysEnergyBtn.addEventListener("click", differenceBetweenDaysEnergy);

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

  let totalCondominiumCurrency = totalCondominium.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });
  resultCondominium.textContent = `O valor a ser pago é ${totalCondominiumCurrency}`;
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

  if(totalIptu < 0) {
    resultIptu.textContent = `Foram utilizados ${diffDays} de Iptu e o valor à ser ressarcido é ${Math.abs(totalIptuCurrency)}`;
  } else
    resultIptu.textContent = `Foram utilizados ${diffDays} de Iptu e o valor à ser pago é ${totalIptuCurrency}`;
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

  resultSpu.textContent = `Valor à ser pago é ${totalSpuCurrency}`;
};
calculateSpuBtn.addEventListener("click", calculateSPU);
