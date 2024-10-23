export const applyMask = (input, maskType) => {
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
export const maskContract = (value) => {
  const part1 = value.slice(0, 4);
  const part2 = value.slice(4, 5);
  const part3 = value.slice(5, 7);

  return `${part1}${part2 ? "-" + part2 : ""}${part3 ? "-" + part3 : ""}`;
};

export const maskPhone = (value) => {
  const countryCode = value.slice(0, 2);
  const areaCode = value.slice(2, 4);
  const part1 = value.slice(4, 9);
  const part2 = value.slice(9, 13);

  return `(+${countryCode} ${areaCode}) ${part1}-${part2}`;
};
export const maskRent = (value) => {
  const countryCode = value.slice(0, 2);
  const areaCode = value.slice(2, 4);
  const part1 = value.slice(4, 9);
  const part2 = value.slice(9, 13);

  return `(+${countryCode} ${areaCode}) ${part1}-${part2}`;
};

export const maskCurrency = (value) => {
  const formattedValue = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value / 100);

  return formattedValue;
};
