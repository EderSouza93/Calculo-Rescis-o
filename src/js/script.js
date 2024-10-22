const getIds = () => {
  const ids = {
    inputs: [],
    results: [],
    controls: [],
  };
  const elements = {
    inputs: {},
    results: {},
    controls: {},
  };

  const allElements = document.querySelectorAll("*[id]");

  allElements.forEach((element) => {
    const id = element.id;
    if (["INPUT", "TEXTAREA", "SELECT"].includes(element.tagName)) {
      ids.inputs.push(id);
      elements.inputs[id] = element;
    }
    if (["DIV", "SPAN", "P"].includes(element.tagName)) {
      ids.results.push(id);
      elements.results[id] = element;
    }
    if (["BUTTON", "A"].includes(element.tagName)) {
      ids.controls.push(id);
      elements.controls[id] = element;
    }
  });

  return { ids, elements };
};

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

//Função geral Mascaras
const applyMask = (input, maskType) => {
  if (!input || !input.value) return;

  let value = input.value.replace(/\D/g, "");

  switch (maskType) {
    case "contract":
      input.value = maskContract(value);
      break;
    case "phone":
      input.value = maskPhone(value);
      break;
    case "rent":
      input.value = maskRent(value);
      break;
    case "currency":
      input.value = maskCurrency(value);
      break;
    default:
      break;
  }
};
const maskContract = (value) => {
  const part1 = value.slice(0, 4);
  const part2 = value.slice(4, 5);
  const part3 = value.slice(5, 7);

  return `${part1}${part2 ? "-" + part2 : ""}${part3 ? "-" + part3 : ""}`;
};

const maskPhone = (value) => {
  const countryCode = value.slice(0, 2);
  const areaCode = value.slice(2, 4);
  const part1 = value.slice(4, 9);
  const part2 = value.slice(9, 13);

  return `(+${countryCode} ${areaCode}) ${part1}-${part2}`;
};
const maskRent = (value) => {
  const countryCode = value.slice(0, 2);
  const areaCode = value.slice(2, 4);
  const part1 = value.slice(4, 9);
  const part2 = value.slice(9, 13);

  return `(+${countryCode} ${areaCode}) ${part1}-${part2}`;
};

const maskCurrency = (value) => {
  const formattedValue = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value / 100);

  return formattedValue;
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
