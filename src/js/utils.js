/**
 * Valida e sanitiza um valor de entrada. 
 * @param {string|number} input - O valor de entrada a ser validade e sanitizado 
 * @returns {string|number} O valor sanitizado
 */
export const validateAndSanitizeInput = (input) => {
    if (typeof input === 'string') {
        return input.trim().replace(/\./g,'').replace(',','.');
    }
    return input;
};

/**
 * Formata um número como uma string de moeda brasileira 
 * @param {number} value - O valor numérico a ser formatado
 * @returns {string} O valor formatado como uma string de moeda brasileira 
 */
export const formatCurrency = (value) => {
    if (value === undefined) {
        return "Valor não definido"
    }
    return value.toLocaleString("pt-br", {
        style: "currency",
        currency: "BRL",
    });
};

/**
 * Calcula a diferença em dias entre duas datas.
 * @param {Date} startDate - A data inicial.
 * @param {Date} endDate - A data final.
 * @returns {number} A diferença em dias entre as duas datas. 
 */
export const getDaysDifference = (startDate, endDate) => {
    const diffTime = Math.abs(endDate - startDate);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24) + 1);
};

/**
 * Formata uma data no formato ISO (YYYY-MM-DD).
 * @param {Date} date - A data a ser formatada.
 * @returns {string} A data formatada no formato ISO.
 */
export const formatDateISO = (date) => {
    return date.toISOString().split('T')[0];
};