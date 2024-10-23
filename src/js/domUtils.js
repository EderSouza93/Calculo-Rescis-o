export const getIds = () => {
    const ids = {
      inputs: [],
      results: [],
      controls: [],
    };
    const elements = {
      inputs: {},
      results: {},
      controls: {},
    };
  
    const allElements = document.querySelectorAll("*[id]");
  
    allElements.forEach((element) => {
      const id = element.id;
      if (["INPUT", "TEXTAREA", "SELECT"].includes(element.tagName)) {
        ids.inputs.push(id);
        elements.inputs[id] = element;
      }
      if (["DIV", "SPAN", "P"].includes(element.tagName)) {
        ids.results.push(id);
        elements.results[id] = element;
      }
      if (["BUTTON", "A"].includes(element.tagName)) {
        ids.controls.push(id);
        elements.controls[id] = element;
      }
    });
  
    return { ids, elements };
  };