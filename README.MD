# Projeto de Cálculos de Aluguel e Despesas

Este projeto é um aplicativo web que realiza cálculos relacionados a contratos de aluguel e despesas associadas, como aluguel, multas, contas de água, energia, condomínio, IPTU e taxa de serviços públicos (SPU).

## Descrição

O aplicativo permite que os usuários insiram informações como datas de contrato, valores de aluguel, leituras de medidores, pagamentos realizados, etc. Com base nesses dados, o aplicativo calcula os valores proporcionais das despesas que o inquilino deve pagar ou ser ressarcido.

O objetivo principal do projeto é fornecer uma ferramenta útil para proprietários de imóveis, administradores de condomínios e inquilinos, facilitando o processo de cálculo e ajuste de contas no final de um contrato de aluguel.

## Funcionalidades

- Cálculo do valor proporcional do aluguel com base nas datas de contrato e pagamento
- Cálculo da multa rescisória em caso de rescisão antecipada do contrato
- Cálculo do valor proporcional das contas de água e energia com base nas datas de leitura e valores das contas
- Cálculo do valor proporcional das taxas de condomínio, IPTU e SPU com base nas datas de contrato e valores das taxas

## Tecnologias Utilizadas

- HTML
- CSS
- JavaScript (ES6+)
- Tailwind

## Instalação e Uso

1. Clone este repositório: `git clone https://github.com/EderSouza93/Calculo-Rescis-o.git`
2. Navegue até o diretório do projeto: `cd CALCULO-RESCI-O`
3. Abra o arquivo `index.html` em um navegador web.

## Proximas Atualizações 

Alteração da lógica, verificar se haverá necessidade de utilizar POO para esse caso. 

O sponsor solicitou o salvamento dos dados para que prossiga com o levantamento em algum momento, isso traz a necessidade de um endpoint ligado a um banco de dados, e uma mascara no campo de mooeda e contrato, criar utilizando o regex, além do envio do email não pode ser automático, pois ele precisa revisar os pontos antes do envio. 
Será necessário adicionar alguns inputs como email e telefone para prosseguir com o envio de e-mail, o envio de arquivo é necessário para gerar um relatório pdf com as informações junto desses arquivos anexados. 

## Licença

Este projeto está licenciado sob a [ISC](LICENSE).