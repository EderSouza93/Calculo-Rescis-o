import {
  calculateRentBill,
  calculateExtraRentDays,
  calculateFineTerminator,
  calculateWater,
  calculateEnergy,
  calculateCondominium,
} from "./calculations.js";
import { Contract } from "./contracts.js";
import {
  validateAndSanitizeInput,
  formatCurrency,
  getDaysDifference,
} from "./utils.js";


const getIds = () => {
  const ids = {
    inputs:[],
    results:[],
    controls: []
  };
  const values = {
    inputs:{},
    results:{},
    controls:{},
  }

  const allElements = document.querySelectorAll('*[id]');

  allElements.forEach(element => {
    const id = element.id;
    if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA' || element.tagName === 'SELECT') {
      ids.inputs.push(id);
      values.inputs[id] = element.value;
    }
    if (element.tagName === 'DIV' || element.tagName === 'SPAN' || element.tagName === 'P') {
      ids.results.push(id);
      values.results[id] = element.textContent;
    }
    if (element.tagName === 'BUTTON' || element.tagName === 'A') {
      ids.controls.push(id);
      values.controls[id] = element.tagName === 'A' ? element.href : element.textContent;
    }
  });
  
  return { ids, values };
}

const { ids, values } = getIds();
console.log(ids);
console.log(values);


// DOM variables
const inputs = {
  contract: values.inputs[ids.inputs[0]],
  address: values.inputs[ids.inputs[1]],
  tenant: values.inputs[ids.inputs[2]],
  guarantor: values.inputs[ids.inputs[3]],
  rent: values.inputs[ids.inputs[4]],
  owner: values.inputs[ids.inputs[5]],
  water: values.inputs[ids.inputs[6]],
  energy: values.inputs[ids.inputs[7]],
  condominium: values.inputs[ids.inputs[8]],
  iptu: values.inputs[ids.inputs[9]],
  spu: values.inputs[ids.inputs[10]],
  exitReason: values.inputs[ids.inputs[11]],
  keyDeliveryDate: values.inputs[ids.inputs[12]],
  keysDelivered: values.inputs[ids.inputs[13]],
  controlDelivered: values.inputs[ids.inputs[14]],
  inspection: values.inputs[ids.inputs[15]],
  allowance: values.inputs[ids.inputs[16]],
  rentDate: values.inputs[ids.inputs[17]],
  fineDuration: values.inputs[ids.inputs[18]],
  energyValue: values.inputs[ids.inputs[19]],
  energyDate: values.inputs[ids.inputs[20]],
  waterValue: values.inputs[ids.inputs[21]],
  waterDate: values.inputs[ids.inputs[22]],
  condominium: values.inputs[ids.inputs[23]],
  condominiumPayment: values.inputs[ids.inputs[24]],
  iptu: values.inputs[ids.inputs[25]],
  iptuPayment: values.inputs[ids.inputs[26]],
  spu: values.inputs[ids.inputs[27]],
  spuPayment: values.inputs[ids.inputs[28]],
};

const results = {
  rentView: document.getElementById('rent-view'),
  rentResult: values.results[ids.results[1]],
  fineResult: values.results[ids.results[2]],
  energyResult: values.results[ids.results[3]],
  waterResult: values.results[ids.results[4]],
  condominiumResult: values.results[ids.results[5]],
  iptuResult: values.results[ids.results[6]],
  spuResult: values.results[ids.results[7]],
  reimbursementSummary: values.results[ids.results[8]],
  paymentSummary: values.results[ids.results[9]],
};

const controls = {
  calcRent: values.controls[ids.controls[0]],
  calcFine: values.controls[ids.controls[1]],
  calcEnergy: values.controls[ids.controls[2]],
  calcWater: values.controls[ids.controls[3]],
  calcCondominium: values.controls[ids.controls[4]],
  calcIptu: values.controls[ids.controls[5]],
  calcSpu: values.controls[ids.controls[6]],
  addFileComents: values.controls[ids.controls[7]],
  calculateButton: values.controls[ids.controls[8]],
  generateEmail: values.controls[ids.controls[9]],
};

const modalElements = {
  modal: document.getElementById("exampleModalCenter"),
  closeBtn: document.getElementById("#exampleModalCente .close"),
  SaveChangesBtn: document.getElementById(
    "#exampleModalCente .btn btn-primary"
  ),
};

// máscara de moeda
/*String.prototype.reverse = function () {
  return this.split("").reverse().join("");
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

// máscara da taxa de energia 
/*const mascaraTaxa = (input, event) => {
  let valor = input.value.replace(/\D/g, '');
  valor = valor.padStart(7, '0');
  let valorFormatado = valor.slice(0, -6).replace(/^0+/,'');
  if (valorFormatado === '') {
    valorFormatado = '0';
  }
  input.value = valorFormatado + ',' + valor.slice(-6);
};*/

// Função para atualizar o texto do elemento rent-view
const viewRent = () => {
  const rentInput = document.getElementById('rent'); // Assumindo que o input tem o id 'rent'
  const rentViewElement = document.getElementById('rent-view');

  if (rentInput && rentViewElement) {
    const rentValue = rentInput.value;
    if (rentValue) {
      rentViewElement.textContent = `R$ ${rentValue}`;
    } else {
      rentViewElement.textContent = 'Valor do Aluguel';
    }
  }
};

// Adicionar event listener ao input de aluguel
const rentInput = document.getElementById('rent');
if (rentInput) {
  rentInput.addEventListener('input', viewRent);
}

// Chamar viewRent inicialmente para configurar o estado inicial
viewRent();

// Função de calculo de aluguel
function calculateRentBillHandler() {
  const tenantName = inputs.tenantName.value;
  const tenantCode = inputs.tenateCode.value;
  const startDate = new Date(inputs.startContract.value);
  const endDate = new Date(inputs.contractEndDate.value);
  const rentAmount = validateAndSanitizeInput(inputs.rentAmount.value);
  const contract = new Contract(
    startDate,
    endDate,
    rentAmount,
    tenantName,
    tenantCode
  );
  const datePayRent = new Date(inputs.datePayRent.value);
  const allowance = validateAndSanitizeInput(controls.dayAllowance.value);
  const extraRentDays = calculateExtraRentDays(
    inputs.contractEndDate.value,
    inputs.datePayRent.value
  );

  const proportionalValue = calculateRentBill(
    endDate,
    rentAmount,
    datePayRent,
    allowance
  );

  if (proportionalValue === undefined || isNaN(proportionalValue)) {
    results.rent.textContent = "Insira dados válidos";
  } else {
    results.rent.textContent = `O inquilino usufruiu do imóvel por ${extraRentDays} dias desde o último vencimento e terá que pagar o proporcional de ${formatCurrency(
      proportionalValue
    )}`;
  }

  return proportionalValue;
}
controls.calculatedBtnRent.addEventListener("click", calculateRentBillHandler);

const calculateFineTerminatorHandler = () => {
  const endDate = new Date(inputs.contractEndDate.value);
  const startDate = new Date(inputs.startContract.value);
  const rentAmount = validateAndSanitizeInput(inputs.rentAmount.value);
  const terminatorFineValue = validateAndSanitizeInput(
    controls.terminatorFine.value
  );
  const terminatorFineText =
    controls.terminatorFine.options[controls.terminatorFine.selectedIndex].text;
  const extraRentDays = calculateExtraRentDays(endDate, startDate);

  const { error, totalFineTerminator } = calculateFineTerminator(
    endDate,
    startDate,
    rentAmount,
    terminatorFineValue
  );

  if (isNaN(endDate.getTime()) || isNaN(startDate.getTime()) || !rentAmount) {
    results.resultFine.textContent = "Insira todos os dados válidos!";
  } else if (extraRentDays >= terminatorFineValue) {
    results.resultFine.textContent = "O contrato não possui multa rescisória";
  } else {
    results.resultFine.textContent = `O inquilino utilizou ${extraRentDays} dias do seu contrato de ${terminatorFineText}, por isso reincidirá uma multa de ${formatCurrency(
      totalFineTerminator
    )} em seu boleto final`;
  }
};
controls.calculateFineBtn.addEventListener(
  "click",
  calculateFineTerminatorHandler
);

// Função Cálculo de Água
const calculateWaterHandler = () => {
  //manipulando os inputs
  const waterReadingDate = new Date(inputs.waterReadingDate.value);
  const waterBill = validateAndSanitizeInput(inputs.waterBillValue.value);
  const contractEndDate = new Date(inputs.contractEndDate.value);
  const daysUse = getDaysDifference(waterReadingDate, contractEndDate);

  const { error, proportionalValue } = calculateWater(
    contractEndDate,
    waterBill,
    waterReadingDate
  );

  if (
    isNaN(contractEndDate.getTime()) ||
    isNaN(waterReadingDate.getTime()) ||
    isNaN(waterBill)
  ) {
    results.resultWater.textContent = "Insira todos os dados válidos";
  } else if (waterReadingDate > contractEndDate) {
    results.resultWater.textContent = "Data de leitura inválida";
  } else if (waterReadingDate < contractEndDate && daysUse > 31) {
    results.resultWater.textContent =
      "Data de leitura muito antiga, verifique a ultima medição!";
  } else
    results.resultWater.textContent = `O inquilino consumiu ${daysUse} dias de água após a última leitura e o seu proporcional é ${formatCurrency(
      proportionalValue
    )}`;
};

controls.differenceDaysWaterBtn.addEventListener(
  "click",
  calculateWaterHandler
);

// Função de Cálculo de Energia por dias
const calculateEnergyHandler = () => {
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
controls.differenceDaysEnergyBtn.addEventListener(
  "click",
  calculateEnergyHandler
);

// Função de Cálculo de Energia por dias
/*const calculateEnergyKwhHandler = () => {
  // manipulando os inputs
  

  // Calculando a diferença de datas


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
controls.differenceDaysEnergyBtn.addEventListener("click", calculateEnergyKwhHandler);*/

// Função de Cálculo do condomínio
const calculateCondominiumHandler = () => {
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
  calculateCondominiumHandler
);

// Função de Cálculo IPTU
const calculateIPTUHandler = () => {
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

  // definindo uma tolerância para evitar problemas com o ponto flutuante.
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
controls.calculateIptuBtn.addEventListener("click", calculateIPTUHandler);

// Função de Cálculo SPU
const calculateSPUHandler = () => {
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
controls.calculateSpuBtn.addEventListener("click", calculateSPUHandler);
