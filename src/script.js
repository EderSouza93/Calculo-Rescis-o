// DOM variables
const contractEndDateInput = document.getElementById("date-end");
const waterBillValueInput = document.getElementById("water-bill-value");
const waterReadingDateInput = document.getElementById("water-reading-date");
const energyBillValueInput = document.getElementById("energy-bill-value");
const energyReadingDateInput = document.getElementById("energy-reading-date");
const condominiumBillValueInput = document.getElementById(
  "condominium-bill-value"
);
const condominiumPaymentInput = document.getElementById("condominium-payment");
const iptuBillValueInput = document.getElementById("iptu-bill-value");
const iptuPaymentInput = document.getElementById("iptu-payment");
const spuBillValueInput = document.getElementById("spu-bill-value");
const spuPaymentInput = document.getElementById("spu-payment");
const differenceDays = document.getElementById("difference-days");

const currentYear = new Date().getFullYear();
const currentTime = new Date(`January 01 ${currentYear}`);

const differenceBetweenDays = () => {
  //manipulando os inputs
  const contractEndDate = contractEndDateInput.value;
  const waterReadingDate = waterReadingDateInput.value;

  //convertendo as datas para objetos
  const data1 = new Date(contractEndDate);
  const data2 = new Date(waterReadingDate);

  const diffTime = Math.abs(data2 - data1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24) + 1);
  console.log(diffDays);
};

differenceDays.addEventListener("click", differenceBetweenDays);
