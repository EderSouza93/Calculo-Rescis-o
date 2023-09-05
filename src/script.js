// DOM variables
const contractEndDateInput = document.getElementById("date-end");
const waterBillValueInput = document.getElementById("water-bill-value");
const waterReadingDateInput = document.getElementById("water-reading-date");
const resultWater = document.getElementById("result-water");
const differenceDaysWaterBtn = document.getElementById("difference-days-water");
const energyBillValueInput = document.getElementById("energy-bill-value");
const energyReadingDateInput = document.getElementById("energy-reading-date");
const resultEnergy = document.getElementById("result-energy");
const differenceDaysEnergyBtn = document.getElementById("difference-days-energy");
const condominiumBillValueInput = document.getElementById(
  "condominium-bill-value"
);
const condominiumPaymentInput = document.getElementById("condominium-payment");
const iptuBillValueInput = document.getElementById("iptu-bill-value");
const iptuPaymentInput = document.getElementById("iptu-payment");
const spuBillValueInput = document.getElementById("spu-bill-value");
const spuPaymentInput = document.getElementById("spu-payment");



const currentYear = new Date().getFullYear();
const currentTime = new Date(`January 01 ${currentYear}`);



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
  console.log(contractEndDate);
  resultWater.textContent = `O valor é ${valueWater}`;
};

differenceDaysWaterBtn.addEventListener("click", differenceBetweenDaysWater);

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
  resultEnergy.textContent = `O valor à ser pago é ${valueEnergy}`;
};

differenceDaysEnergyBtn.addEventListener("click", differenceBetweenDaysEnergy)

const calculateCondomium = () => {
  
}