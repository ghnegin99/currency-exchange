//Selectors
const formAmountInput = document.querySelector('.from-amount-input');
const fromCurrencyOptions = document.querySelector('.from-currency select');
const toCurrencyOptions = document.querySelector('.to-currency select');
const convertBtn = document.querySelector('.convert-btn');
const resultsList = document.querySelector('.results-list')
const exchangeBtn = document.querySelector('.icon button')


if (formAmountInput.value) {

    const symbolApi = 'https://api.exchangerate.host/symbols';

    async function loadCountrySymbols() {
        const symbolApi = 'https://api.exchangerate.host/symbols';
        const symbolResult = await fetch(symbolApi);
        const data = await symbolResult.json();
        let symbolList = data.symbols;
        showData(symbolList);
    }

    document.addEventListener('DOMContentLoaded', () => {

        loadCountrySymbols();
    });

    function showData(symbols) {
        let symbolsOnly = Object.keys(symbols);

        // let options = "";
        symbolsOnly.forEach(symbol => {
            // options += `<option data-id="${symbol}">${symbol}</option>`
            fromCurrencyOptions.innerHTML += `<option data-id="${symbol}">${symbol}</option>`
            toCurrencyOptions.innerHTML += `<option data-id="${symbol}">${symbol}</option>`
        });
        // fromCurrencyOptions.innerHTML = options;
        fromCurrencyOptions.querySelectorAll('option').forEach(option => {
            if (option.dataset.id == "USD") option.selected = 'selected'
        })
        toCurrencyOptions.querySelectorAll('option').forEach(option => {
            if (option.dataset.id == "IRR") option.selected = 'selected'
        })
    }




}
// }

//validate the amount
formAmountInput.addEventListener('keyup', function () {
    let amount = Number(this.value)
    if (!amount) formAmountInput.style.border = '1px solid red'
})


//convert 'from country currency' to 'to country currency'
convertBtn.addEventListener('click', () => {
    let fromCurrency = fromCurrencyOptions.value;
    let toCurrency = toCurrencyOptions.value;
    let fromAmt = formAmountInput.value;
    if (fromAmt) getConvertedData(fromCurrency, toCurrency, fromAmt)
})

//get converted Data from API
async function getConvertedData(from, to, amount) {
    const api = `https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${amount}`;
    const result = await fetch(api);
    const data = await result.json()
    displayConvertedData(from, to, amount, data.result)
}

//display the converted result
function displayConvertedData(fromCurrency, toCurrency, fromAmt, toAmt) {
    const exchangeDiv = document.createElement('div');
    exchangeDiv.classList.add('result');
    const newExchange = document.createElement('li');
    newExchange.classList.add('result-item');
    // newExchange.innerText = formAmountInput.value;
    newExchange.innerText = ` ${fromAmt} ${fromCurrency} معادل ${toAmt} ${toCurrency} است.`;
    exchangeDiv.appendChild(newExchange);


    resultsList.appendChild(exchangeDiv);
}



exchangeBtn.addEventListener('click', () => {

    let temp;
    temp = fromCurrencyOptions.value;
    fromCurrencyOptions.value = toCurrencyOptions.value;
    toCurrencyOptions.value = temp;

})