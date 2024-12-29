export const validateInputs = (...inputs) => {
    for (const inputs of inputs) {
        if(isNaN(inputs) || inputs <= 0){
            return { sucess: false, message: "Insira dados válidos."};
        }
    }
    return { sucess: true };
}