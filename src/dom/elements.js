export const domManager = {
  getElements() {
    const elements = {
      inputs: {},
      results: {},
      controls: {},
    };

    const allElements = document.querySelectorAll("*[id]");

    console.log('Todos os elementos encontrados:',
        Array.from(allElements).map(el => ({
            id: el.id,
            tagName: el.tagName
        }))
     )

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
