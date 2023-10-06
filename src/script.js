// DOM variables
const inputs = {
  startContract: document.getElementById("start-contract"),
  contractEndDate: document.getElementById("date-end"),
  billRent: document.getElementById("rent-bill-value"),
  datePayRent: document.getElementById("rent-payment-date"),
  waterBillValue: document.getElementById("water-bill-value"),
  waterReadingDate: document.getElementById("water-reading-date"),
  energyBillValue: document.getElementById("energy-bill-value"),
  energyReadingDate: document.getElementById("energy-reading-date"),
  condominiumBillValue: document.getElementById("condominium-bill-value"),
  condominiumPayment: document.getElementById("condominium-payment"),
  iptuBillValue: document.getElementById("iptu-bill-value"),
  iptuPayment: document.getElementById("iptu-payment"),
  spuBillValue: document.getElementById("spu-bill-value"),
  spuPayment: document.getElementById("spu-payment"),
};

const results = {
  rent: document.getElementById("result-rent"),
  resultFine: document.getElementById("result-fine"),
  resultWater: document.getElementById("result-water"),
  resultEnergy: document.getElementById("result-energy"),
  resultCondominium: document.getElementById("result-condominium"),
  resultIptu: document.getElementById("result-iptu"),
  resultSpu: document.getElementById("result-spu"),
};

const controls = {
  calculateFineBtn: document.getElementById("calculated-fine"),
  terminatorFine: document.getElementById("terminator-fine"),
  dayAllowance: document.getElementById("day-allowance"),
  calculatedBtnRent: document.getElementById("calculated-rent"),
  differenceDaysWaterBtn: document.getElementById("difference-days-water"),
  differenceDaysEnergyBtn: document.getElementById("difference-days-energy"),
  calculateCondominiumBtn: document.getElementById(
    "difference-days-condominuim"
  ),
  calculateIptuBtn: document.getElementById("difference-days-iptu"),
  calculateSpuBtn: document.getElementById("difference-days-spu"),
  calculatedGeneral: document.getElementById("calculated-all"),
};

// máscara de moeda
String.prototype.reverse = function () {
  return this.split("").reverse().join("");
};

const formatCurrency = (value) => {
  return value.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });
};

function mascaraMoeda(campo, evento) {
  var tecla = !evento ? window.event.keyCode : evento.which;
  var valor = campo.value.replace(/[^\d]+/gi, "").reverse();
  var resultado = "";
  var mascara = "##.###.###,##".reverse();
  for (var x = 0, y = 0; x < mascara.length && y < valor.length; ) {
    if (mascara.charAt(x) != "#") {
      resultado += mascara.charAt(x);
      x++;
    } else {
      resultado += valor.charAt(y);
      y++;
      x++;
    }
  }
  campo.value = resultado.reverse();
}

// Função de calculo de aluguel
const calculateRentBill = () => {
  const contractEndDate = new Date(inputs.contractEndDate.value);
  const billRent = parseFloat(
    inputs.billRent.value.replace(/\./g, "").replace(",", ".")
  );
  const datePayRent = new Date(inputs.datePayRent.value);

  const diffTime = Math.abs(datePayRent - contractEndDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24) + 1);

  let allowance = parseInt(controls.dayAllowance.value, 10);
  let allowancetext =
    controls.dayAllowance.options[controls.dayAllowance.selectedIndex].text;
  const proportionalValue = (billRent / 30) * (diffDays - allowance);

  let proportionalValueCurrency = formatCurrency(proportionalValue);

  if (!contractEndDate || isNaN(billRent) || isNaN(datePayRent)) {
    results.rent.textContent = "Insira dados válidos";
  } else if (contractEndDate < datePayRent) {
    results.rent.textContent =
      "Dados inválidos, verifique as datas de finalização de contrato e do último vencimento do aluguel.";
  } else if (datePayRent < contractEndDate && diffDays > 32) {
    results.rent.textContent =
      "Dados inválidos, verifique a data do último vencimento do aluguel";
  } else if (allowance <= 0) {
    results.rent.textContent = `O inquilino usufluiu do imóvel por ${diffDays} dias desde o último vencimento e terá que pagar o proporcional de ${proportionalValueCurrency}`;
  } else
    results.rent.textContent = `O inquilino usufluiu do imóvel por ${diffDays} dias desde o último vencimento e teve um abono de ${allowancetext}, portanto terá que pagar o proporcional de ${proportionalValueCurrency}`;
};
controls.calculatedBtnRent.addEventListener("click", calculateRentBill);

const calculateFineTerminator = () => {
  const contractEndDate = new Date(inputs.contractEndDate.value);
  const startContract = new Date(inputs.startContract.value);
  const billRent = parseFloat(
    inputs.billRent.value.replace(/\./g, "").replace(",", ".")
  );
  const terminatorFineValue =
    controls.terminatorFine.options[controls.terminatorFine.selectedIndex]
      .value;
  const terminatorFineText =
    controls.terminatorFine.options[controls.terminatorFine.selectedIndex].text;

  const diffTime = Math.abs(startContract - contractEndDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24) + 1);

  // Definindo os dias de não uso
  const nonUseDays = terminatorFineValue - diffDays;

  // Calculando a multa rescisória
  const totalFineTerminator = (3 * billRent * nonUseDays) / terminatorFineValue;

  let fineTerminatorCurrency = formatCurrency(totalFineTerminator);

  if (!contractEndDate || !startContract || isNaN(billRent)) {
    results.resultFine.textContent = "Insira todos os dados válidos!";
  } else if (diffDays >= terminatorFineValue) {
    results.resultFine.textContent = "O contrato não possui multa rescisória";
  } else {
    results.resultFine.textContent = `O inquilino utilizou ${diffDays} dias do seu contrato de ${terminatorFineText}, por isso reincidirá uma multa de ${fineTerminatorCurrency} em seu boleto final`;
  }
};
controls.calculateFineBtn.addEventListener("click", calculateFineTerminator);

// Função Cálculo de Água
const calculateWater = () => {
  //manipulando os inputs
  const waterReadingDate = new Date(inputs.waterReadingDate.value);
  const waterBillValue = parseFloat(
    inputs.waterBillValue.value.replace(/\./g, "").replace(",", ".")
  );
  const contractEndDate = new Date(inputs.contractEndDate.value);

  // Calculando a diferença de dias
  const diffTime = Math.abs(waterReadingDate - contractEndDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24) + 1);
  // Calculando o valor a ser ressarcido de água
  const valueWater = (waterBillValue / 30) * diffDays;

  let valueWaterCurrency = formatCurrency(valueWater);

  if (!contractEndDate || !waterReadingDate || isNaN(waterBillValue)) {
    results.resultWater.textContent = "Insira todos os dados válidos";
  } else if (waterReadingDate > contractEndDate) {
    results.resultWater.textContent = "Data de leitura inválida";
  } else if (waterReadingDate < contractEndDate && diffDays > 31) {
    results.resultWater.textContent =
      "Data de leitura muito antiga, verifique a ultima medição!";
  } else
    results.resultWater.textContent = `O inquilino consumiu ${diffDays} dias de água após a última leitura e o seu proporcional é ${valueWaterCurrency}`;
};

controls.differenceDaysWaterBtn.addEventListener("click", calculateWater);

// Função de Cálculo de Energia
const calculateEnergy = () => {
  // manipulando os inputs
  const energyBillValue = parseFloat(
    inputs.energyBillValue.value.replace(/\./g, "").replace(",", ".")
  );
  const energyReadingDate = new Date(inputs.energyReadingDate.value);
  const contractEndDate = new Date(inputs.contractEndDate.value);

  // Calculando a diferença de datas
  const diffTime = Math.abs(energyReadingDate - contractEndDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  const valueEnergy = (energyBillValue / 30) * diffDays;

  let valueEnergyCurrency = formatCurrency(valueEnergy);

  // Definindo um validador para cada data de vencimento específico
  if (!contractEndDate || !energyReadingDate || isNaN(energyBillValue)) {
    results.resultEnergy.textContent = "Insira todos os dados válidos";
  } else if (energyReadingDate > contractEndDate) {
    results.resultEnergy.textContent = "Data de leitura inválida";
  } else if (energyReadingDate < contractEndDate && diffDays > 31) {
    results.resultEnergy.textContent =
      "Data de leitura muito antiga, verifique a ultima medição";
  } else
    results.resultEnergy.textContent = `O inquilino consumiu ${diffDays} dias  de energia após a última leitura e o seu proporcional é ${valueEnergyCurrency}`;
};
controls.differenceDaysEnergyBtn.addEventListener("click", calculateEnergy);

// Função de Cálculo do condomínio
const calculateCondominium = () => {
  // Manipulando os inputs
  const condBillValue = parseFloat(
    inputs.condominiumBillValue.value.replace(/\./g, "").replace(",", ".")
  );
  const condPayment = parseFloat(
    inputs.condominiumPayment.value.replace(/\./g, "").replace(",", ".")
  );
  const contractEndDate = new Date(inputs.contractEndDate.value);

  // Obtendo o primeiro dia do mês atual
  const date = new Date();
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);

  // Calculando a diferença de datas
  const diffTime = Math.abs(firstDay - contractEndDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24) + 1);

  // Calculando
  const valueCondominium = (condBillValue / 30) * diffDays;
  const totalCondominium = valueCondominium - condPayment;

  // Convertendo para a moeda local
  let valueCondCurrency = formatCurrency(valueCondominium);
  let totalCondominiumCurrency = formatCurrency(totalCondominium);

  // mudando o sinal do valor atribuído na variável
  let convertValue = Math.abs(totalCondominium);
  let convertValueCurrency = formatCurrency(convertValue);

  // definindo uma tolerância para evitar problemas com o ponto flotuante.
  const tolerance = 0.01;

  if (isNaN(condBillValue) || !contractEndDate) {
    results.resultCondominium.textContent = "Insira dados válidos";
  } else if (isNaN(condPayment) || condPayment === 0) {
    results.resultCondominium.textContent = `O inquilino utilizou ${diffDays} dias do condomínio sem pagar e tem uma proporcionalidade de ${valueCondCurrency} a pagar! `;
  } else if (Math.abs(totalCondominium) < tolerance) {
    results.resultCondominium.textContent = `O inquilino utilizou ${diffDays} dias de condomínio e efetuou o pagamento exato de sua proporcionalidade!`;
  } else if (totalCondominium < 0) {
    results.resultCondominium.textContent = `O inquilino utilizou ${diffDays} dias do condomínio e efetuou pagamento, então ele terá ${convertValueCurrency} a ser ressarcido`;
  } else
    results.resultCondominium.textContent = `O inquilino utilizou ${diffDays} dias do condomínio e efetuou o pagamento, porém tem uma proporcionalidade de ${totalCondominiumCurrency} a pagar!`;
};
controls.calculateCondominiumBtn.addEventListener(
  "click",
  calculateCondominium
);

// Função de Cálculo IPTU
const calculateIPTU = () => {
  const iptuBillValue = parseFloat(
    inputs.iptuBillValue.value.replace(/\./g, "").replace(",", ".")
  );
  const iptuPayment = parseFloat(
    inputs.iptuPayment.value.replace(/\./g, "").replace(",", ".")
  );
  const contractEndDate = new Date(inputs.contractEndDate.value);
  const startContract = new Date(inputs.startContract.value);

  // Corrigindo o bug da mascara caso seja imputado um valor vazio
  let iptuPaymentFormat;
  if (isNaN(iptuPayment)) {
    iptuPaymentFormat = 0;
  } else iptuPaymentFormat = iptuPayment;

  // Obtendo a data atual
  const currentYear = new Date().getFullYear();
  const currentTime = new Date(`January 01 ${currentYear}`);

  // Validando se o contrato iniciou antes ou depois do ano vigente para o calculo de proporcionalidade de IPTU
  let diffTimeIptu;
  let diffDaysIptu;
  if (currentTime < startContract) {
    diffTimeIptu = Math.abs(startContract - contractEndDate);
    diffDaysIptu = Math.ceil(diffTimeIptu / (1000 * 60 * 60 * 24) + 1);
  } else if (currentTime > startContract) {
    diffTimeIptu = Math.abs(currentTime - contractEndDate);
    diffDaysIptu = Math.ceil(diffTimeIptu / (1000 * 60 * 60 * 24) + 1);
  } else {
    ("verificar");
  }

  const valueIptu = (iptuBillValue / 365) * diffDaysIptu;
  const totalIptu = valueIptu - iptuPaymentFormat;

  let IptuCurrency = formatCurrency(valueIptu);

  let positiveValue = Math.abs(totalIptu);

  let IptuValueCurrency = formatCurrency(positiveValue);

  // definindo uma tolerância para evitar problemas com o ponto flotuante.
  const tolerance = 0.01;

  if (!contractEndDate || isNaN(iptuBillValue)) {
    results.resultIptu.textContent = "Insira dados válidos.";
  } else if (isNaN(iptuPayment)) {
    results.resultIptu.textContent = `O inquilino não efetuou nenhum pagamento referente ao ano de ${currentYear}, utilizou ${diffDaysIptu} dias e terá uma proporcionalide de ${IptuValueCurrency} a pagar.`;
  } else if (Math.abs(totalIptu) < tolerance) {
    results.resultIptu.textContent = `O inquilino utilizou ${diffDaysIptu} dias do IPTU referente ao ano ${currentYear} e efetuou o pagamento exato de sua proporcionalidade.`;
  } else if (totalIptu < 0) {
    results.resultIptu.textContent = `O inquilino utilizou ${diffDaysIptu} dias do IPTU referente ao ano ${currentYear} e efetuou pagamento, então ele terá ${IptuValueCurrency} a ser ressarcido.`;
  } else
    results.resultIptu.textContent = `O inquilino utilizou ${diffDaysIptu} dias do IPTU referente ao ano ${currentYear} e efetuou o pagamento, porém tem uma proporcionalidade de ${IptuValueCurrency} a pagar.`;
};
controls.calculateIptuBtn.addEventListener("click", calculateIPTU);

// Função de Cálculo SPU
const calculateSPU = () => {
  const spuBillValue = parseFloat(
    inputs.spuBillValue.value.replace(/\./g, "").replace(",", ".")
  );
  const spuPayment = parseFloat(
    inputs.spuPayment.value.replace(/\./g, "").replace(",", ".")
  );
  const contractEndDate = new Date(inputs.contractEndDate.value);
  const startContract = new Date(inputs.startContract.value);

  // Corrigindo o bug da mascara caso seja imputado um valor vazio
  let spuPaymentFormat;
  if (isNaN(spuPayment)) {
    spuPaymentFormat = 0;
  } else spuPaymentFormat = spuPayment;

  // Obtendo a data atual
  const currentYear = new Date().getFullYear();
  const currentTime = new Date(`January 01 ${currentYear}`);

  // Validando se o contrato iniciou antes ou depois do ano vigente para o calculo de proporcionalidade de SPU
  let diffTimeSpu;
  let diffDaysSpu;
  if (currentTime < startContract) {
    diffTimeSpu = Math.abs(startContract - contractEndDate);
    diffDaysSpu = Math.ceil(diffTimeSpu / (1000 * 60 * 60 * 24) + 1);
  } else if (currentTime > startContract) {
    diffTimeSpu = Math.abs(currentTime - contractEndDate);
    diffDaysSpu = Math.ceil(diffTimeSpu / (1000 * 60 * 60 * 24) + 1);
  } else {
    ("verificar");
  }

  const valueSpu = (spuBillValue / 365) * diffDaysSpu;
  const totalSpu = valueSpu - spuPaymentFormat;

  let SpuCurrency = formatCurrency(valueSpu);

  let positiveValue = Math.abs(totalSpu);

  let SpuValueCurrency = formatCurrency(positiveValue);

  // definindo uma tolerância para evitar problemas com o ponto flotuante.
  const tolerance = 0.01;

  if (!contractEndDate || isNaN(spuBillValue)) {
    results.resultSpu.textContent = "Insira dados válidos";
  } else if (isNaN(spuPayment)) {
    results.resultSpu.textContent = `O inquilino não efetuou nenhum pagamento referente ao ano de ${currentYear}, utilizou ${diffDaysSpu} dias e terá uma proporcionalide de ${SpuValueCurrency} a pagar!`;
  } else if (Math.abs(totalSpu) < tolerance) {
    results.resultSpu.textContent = `O inquilino utilizou ${diffDaysSpu} dias do SPU referente ao ano ${currentYear} e efetuou o pagamento exato de sua proporcionalidade`;
  } else if (totalSpu < 0) {
    results.resultSpu.textContent = `O inquilino utilizou ${diffDaysSpu} dias do SPU referente ao ano ${currentYear} e efetuou pagamento, então ele terá ${SpuValueCurrency} a ser ressarcido`;
  } else
    results.resultSpu.textContent = `O inquilino utilizou ${diffDaysSpu} dias do SPU referente ao ano ${currentYear} e efetuou o pagamento, porém tem uma proporcionalidade de ${SpuValueCurrency} a pagar!`;
};
controls.calculateSpuBtn.addEventListener("click", calculateSPU);
