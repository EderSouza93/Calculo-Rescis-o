export const masks = {
  contract(value) {
    if (!value) return "";
    value = value.replace(/\D/g, "");
    const part1 = value.slice(0, 4);
    const part2 = value.slice(4, 5);
    const part3 = value.slice(5, 7);
    return `${part1}${part2 ? "-" + part2 : ""}${part3 ? "-" + part3 : ""}`;
  },

  phone(value) {
    if (!value) return "";
    value = value.replace(/\D/g, "");
    const countryCode = value.slice(0, 2);
    const areaCode = value.slice(2, 4);
    const part1 = value.slice(4, 9);
    const part2 = value.slice(9, 13);
    return `(+${countryCode} ${areaCode}) ${part1}-${part2}`;
  },

  currency(value) {
    if (!value) return "R$ 0,00";
    value = value.replace(/\D/g, "");
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value / 100);
  },
};
