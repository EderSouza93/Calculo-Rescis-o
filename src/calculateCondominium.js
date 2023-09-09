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
  let totalCondominium = valueCondominium - condominiumPayment;

  let totalCondominiumCurrency = totalCondominium.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });

  let convertValue = Math.abs(totalCondominium);

  let convertValueCurrency = convertValue.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });

  console.log(condominiumBillValue);

  if (condominiumPayment == "") {
    resultCondominium.textContent = `O inquilino utilizou ${diffDays} dias do condomínio sem pagar e tem uma proporcionalidade de ${totalCondominiumCurrency} a pagar! `;
  } else if (condominiumBillValue == "") {
    resultCondominium.textContent = "Insira dados válidos";
  } else if (totalCondominium == 0) {
    resultCondominium.textContent =
      "O inquilino efetuou o pagamento exato de sua proporcionalidade!";
  } else if (totalCondominium < 0) {
    resultCondominium.textContent = `O inquilino utilizou ${diffDays} dias do condomínio e efetuou pagamento, então ele terá ${convertValueCurrency} a ser ressarcido`;
  } else
    resultCondominium.textContent = `O inquilino utilizou ${diffDays} dias do condomínio e efetuou o pagamento porém tem uma proporcionalidade de ${totalCondominiumCurrency} a pagar!`;
};
