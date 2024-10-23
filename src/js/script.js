import { getIds } from "./domUtils.js";
import { applyMask, maskContract, maskPhone, maskRent, maskCurrency } from "./masks.js";
import { autoSave } from "./autoSave.js";

const { ids, elements } = getIds();
console.log(ids);
console.log(elements);

const applyMaskToMultipleFields = (selectors, maskType) => {
  selectors.forEach((selector) => {
    const input = elements.inputs[selector];
    if (input) {
      input.addEventListener("input", function () {
        applyMask(this, maskType);
      });
    } else {
      console.error(`Elemento não encontrado: ${selector}`);
    }
  });
};


document.addEventListener("DOMContentLoaded", function () {
  getIds();
  applyMaskToMultipleFields(["contract"], "contract");
  applyMaskToMultipleFields(["tenant-phone", "owner-phone"], "phone");
  applyMaskToMultipleFields(["rent"], "currency");

  // Adicionar event listener ao input de aluguel
  const rentInput = elements.inputs["rent"];
  if (rentInput) {
    rentInput.addEventListener("input", viewRent);
  }
});

// Função para atualizar o texto do elemento rent-view
const viewRent = () => {
  const rentInput = elements.inputs["rent"];
  const rentViewElement = elements.results["rent-view"];

  if (rentInput && rentViewElement) {
    let rentValue = rentInput.value;
    rentValue = rentValue.replace(/[R$\s]/g, "");
    const numericValue = rentValue.replace(/\./g, "").replace(",", ".");
    const formattedValue = parseFloat(numericValue);
    rentViewElement.textContent = !isNaN(formattedValue)
      ? `R$ ${formattedValue.toFixed(2)}`
      : "Valor do Aluguel";
  }
};

// Chamar viewRent inicialmente para configurar o estado inicial
viewRent();

const durationMap = {
  365: "1 Ano",
  730: "2 Anos",
  1095: "3 Anos",
  1460: "4 Anos",
  1825: "5 Anos",
};

const viewContractDuration = () => {
  const contractDuration = elements.inputs["contract-duration"];
  const contractDurationViewElement =
    elements.results["contract-duration-view"];

  if (contractDuration && contractDurationViewElement) {
    const DurationValue = contractDuration.value;
    const durationText = durationMap[DurationValue] || "";
    contractDurationViewElement.textContent = durationText;
  }
};

const contractDuration = elements.inputs["contract-duration"];
if (contractDuration) {
  contractDuration.addEventListener("change", viewContractDuration);
}

viewContractDuration();

const sendInputsToBackend = () => {
  const inputValues = {};

  Object.keys(elements.inputs).forEach((id) => {
    inputValues[id] = elements.inputs[id].value;
  });

  autoSave(inputValues)
}

elements.controls['save-button'].addEventListener('click', sendInputsToBackend)