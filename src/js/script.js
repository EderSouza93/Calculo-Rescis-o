const getIds = () => {
  const ids = {
    inputs:[],
    results:[],
    controls: []
  };
  const values = {
    inputs:{},
    results:{},
    controls:{},
  }

  const allElements = document.querySelectorAll('*[id]');

  allElements.forEach(element => {
    const id = element.id;
    if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA' || element.tagName === 'SELECT') {
      ids.inputs.push(id);
      values.inputs[id] = element.value;
    }
    if (element.tagName === 'DIV' || element.tagName === 'SPAN' || element.tagName === 'P') {
      ids.results.push(id);
      values.results[id] = element.textContent;
    }
    if (element.tagName === 'BUTTON' || element.tagName === 'A') {
      ids.controls.push(id);
      values.controls[id] = element.tagName === 'A' ? element.href : element.textContent;
    }
  });
  
  return { ids, values };
}

const { ids, values } = getIds();
console.log(ids);
console.log(values);

// máscara de moeda
/*String.prototype.reverse = function () {
  return this.split("").reverse().join("");
};



function mascaraMoeda(campo, evento) {
  var tecla = !evento ? window.event.keyCode : evento.which;
  var valor = campo.value.replace(/[^\d]+/gi, "").reverse();
  var resultado = "";
  var mascara = "##.###.###,##".reverse();
  for (var x = 0, y = 0; x < mascara.length && y < valor.length; ) {
    if (mascara.charAt(x) != "#") {
      resultado += mascara.charAt(x);
      x++;
    } else {
      resultado += valor.charAt(y);
      y++;
      x++;
    }
  }
  campo.value = resultado.reverse();
}

// máscara da taxa de energia 
/*const mascaraTaxa = (input, event) => {
  let valor = input.value.replace(/\D/g, '');
  valor = valor.padStart(7, '0');
  let valorFormatado = valor.slice(0, -6).replace(/^0+/,'');
  if (valorFormatado === '') {
    valorFormatado = '0';
  }
  input.value = valorFormatado + ',' + valor.slice(-6);
};*/

// Função para atualizar o texto do elemento rent-view
const viewRent = () => {
  const rentInput = document.getElementById('rent'); // Assumindo que o input tem o id 'rent'
  const rentViewElement = document.getElementById('rent-view');

  if (rentInput && rentViewElement) {
    const rentValue = rentInput.value;
    if (rentValue) {
      rentViewElement.textContent = `R$ ${rentValue}`;
    } else {
      rentViewElement.textContent = 'Valor do Aluguel';
    }
  }
};

// Adicionar event listener ao input de aluguel
const rentInput = document.getElementById('rent');
if (rentInput) {
  rentInput.addEventListener('input', viewRent);
}

// Chamar viewRent inicialmente para configurar o estado inicial
viewRent();

