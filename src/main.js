import { domManager } from "./dom/elements.js";
import { masks } from "./utils/masks.js";
import { contractCalculator } from "./features/contractCalculator.js";
import { contractService } from "./services/api.js";
import { formatters } from "./utils/formatters.js";

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

    if (result.success) {
        this.elements.results["rent-result"].innerText = result.message
    } else {
        this.elements.results["rent-result"].innerText = result.message
    }
  }

  async saveContract() {
    try {
      const formData = this.collectFormData();
      await contractService.saveContract(formData);
      alert("Contrato salvo com sucesso!");
    } catch (error) {
      alert("Erro ao salvar contrato");
      console.error(error);
    }
  }

  collectFormData() {
    const formData = {};
    Object.entries(this.elements.inputs).forEach(([id, element]) => {
      formData[id] = element.value;
    });
    return formData;
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
