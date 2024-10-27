import { domManager } from "./dom/elements.js";
import { masks } from "./utils/masks.js";
import { contractCalculator } from "./features/contractCalculator.js";
import { contractService } from "./services/api.js";
import { formatters } from "./utils/formatters.js";
import { notification } from "./utils/notifications.js";

class ContractManager {
  constructor() {
    this.elements = domManager.getElements();
    this.setupEventListeners();
  }

  setupEventListeners() {
    // Máscaras
    this.setupMasks();

    // Cálculos
    this.calculateRent()
    this.elements.controls["calc-rent"]?.addEventListener("click", () =>
      this.calculateRent()
    );
    
    this.calculateFineTerminator()
    this.elements.controls["calc-fine"] ?.addEventListener("click", () =>
      this.calculateFineTerminator()
    );

    // Salvamento
    this.elements.controls["save-button"]?.addEventListener("click", () =>
      this.saveContract()
    );

    // Visualizações
    this.setupViewListeners();
  }

  setupMasks() {
    // Máscara de contrato
    this.elements.inputs["contract"]?.addEventListener("input", (e) => {
      e.target.value = masks.contract(e.target.value);
    });

    // Máscaras de telefone
    ["tenant-phone", "owner-phone"].forEach((id) => {
      this.elements.inputs[id]?.addEventListener("input", (e) => {
        e.target.value = masks.phone(e.target.value);
      });
    });

    // Máscaras de moeda
    [
      "rent",
      "energy-value",
      "water-value",
      "condominium",
      "condominium-payment",
      "iptu",
      "iptu-payment",
      "spu",
      "spu-payment",
    ].forEach((id) => {
      this.elements.inputs[id]?.addEventListener("input", (e) => {
        e.target.value = masks.currency(e.target.value);
      });
    });
  }

  setupViewListeners() {
    // Visualização do aluguel
    this.elements.inputs["rent"]?.addEventListener("input", () =>
      this.updateRentView()
    );

    // Visualização da duração do contrato
    this.elements.inputs["contract-duration"]?.addEventListener("change", () =>
      this.updateContractDurationView()
    );
  }

  calculateRent() {
    const rentDate = new Date(this.elements.inputs["rent-date"].value);
    const endDate = new Date(this.elements.inputs["key-delivery-date"].value);
    const rentValue = formatters.toNumber(this.elements.inputs["rent"].value);
    const allowanceDays = this.elements.inputs["allowance"].value;

    const result = contractCalculator.calculateProportionalRent(
      rentDate,
      endDate,
      rentValue,
      allowanceDays
    );

    this.elements.results['rent-result'].innerText = result.message
  }

  calculateFineTerminator() {
    const startDate = new Date(this.elements.inputs['start-date'].value);
    const endDate = new Date(this.elements.inputs['key-delivery-date'].value);
    const rentValue = formatters.toNumber(this.elements.inputs['rent'].value);
    const contractDuration = parseFloat(this.elements.inputs['contract-duration'].value);
    const contractDurationText = this.elements.inputs['contract-duration'].selectedOptions[0].text;

    const result = contractCalculator.calculateTerminatorFine(
      startDate,
      endDate,
      rentValue,
      contractDuration,
      contractDurationText
    );

    this.elements.results['fine-result'].innerText = result.message
  }

  collectFormData() {
    const formData = {};

    const allElements = {...this.elements.inputs, ...this.elementsresults };

    Object.entries(allElements).forEach(([id, element]) => {
      formData[id] = element.value;
    });
    return formData;
  }

  async saveContract() {
    try {
      const formData = this.collectFormData();
      await contractService.saveContract(formData);

      console.log(formData)
    } catch (error) {
        notification("Erro ao salvar o contrato. Tente novamente mais tarde.", "#ef4444");
      console.error(error);
    }
  }

  updateRentView() {
    const rentInput = this.elements.inputs["rent"];
    const rentView = this.elements.results["rent-view"];
    if (rentInput && rentView) {
      const value = formatters.toNumber(rentInput.value);
      rentView.textContent = formatters.toCurrency(value);
    }
  }

  updateContractDurationView() {
    const durationMap = {
      365: "1 Ano",
      730: "2 Anos",
      1095: "3 Anos",
      1460: "4 Anos",
      1825: "5 Anos",
    };

    const durationInput = this.elements.inputs["contract-duration"];
    const durationView = this.elements.results["contract-duration-view"];

    if (durationInput && durationView) {
      durationView.textContent = durationMap[durationInput.value] || "";
    }
  }
}

// Inicialização
document.addEventListener("DOMContentLoaded", () => {
  new ContractManager();
});
