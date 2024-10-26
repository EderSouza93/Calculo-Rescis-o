export const formatters = {
    toCurrency(value) {
        if (value === undefined) return "Valor não definido";
        return value.toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL"
        });
    },

    toNumber(currencyString) {
        if (!currencyString) return 0;
        return Number(
            currencyString
                .replace("R$", "")
                .replace(/\./g, "")
                .replace(/\s/g, "")
                .replace(",", ".")
        );
    },

    toDate(date) {
        return date.toISOString().split('T')[0];
    }
}