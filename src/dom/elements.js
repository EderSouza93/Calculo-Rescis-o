export const domManager = {
  getElements() {
    const elements = {
      inputs: {},
      results: {},
      controls: {},
    };

    const allElements = document.querySelectorAll("*[id]");

    console.log('Todos os elementos encontrados:',
        elements.controls,'controls', elements.inputs, 'inputs', elements.results, 'results')

    allElements.forEach((element) => {
      const id = element.id;
      if (["INPUT", "TEXTAREA", "SELECT"].includes(element.tagName)) {
        elements.inputs[id] = element;
      } else if (["DIV", "SPAN", "P"].includes(element.tagName)) {
        elements.results[id] = element;
      } else if (["BUTTON", "A"].includes(element.tagName)) {
        elements.controls[id] = element;
      }
    });

    return elements;
  },
};
