const endpoint = "https://api.exchangerate-api.com/v4/latest/";

const fromCurrencyElem = document.getElementById('from-currency');
const toCurrencyElem = document.getElementById('to-currency');
const inputAmtElem = document.getElementById('input-amt');
const convertedAmtElem = document.getElementById('converted-amt');
const exchangeRateElem = document.getElementById('exchange-rate');

document.getElementById('swap-btn').addEventListener('click', () => {
  const swap = fromCurrencyElem.value;
  fromCurrencyElem.value = toCurrencyElem.value;
  toCurrencyElem.value = swap;
  convert();
 });
 
fromCurrencyElem.addEventListener('change', convert);
toCurrencyElem.addEventListener('change', convert);
inputAmtElem.addEventListener('input', convert);
convertedAmtElem.addEventListener('input', convert);

function convert() {
  const fromCurrency = fromCurrencyElem.value;
  const toCurrency = toCurrencyElem.value;
 
  fetch(`${endpoint}${fromCurrency}`)
  .then(res => res.json())
  .then(res => {
    const exchangeRate = res.rates[toCurrency];
    const roundedRate = exchangeRate.toFixed(2);
    exchangeRateElem.innerText = `1 ${fromCurrency} = ${roundedRate} ${toCurrency}`
    convertedAmtElem.value = (inputAmtElem.value * exchangeRate).toFixed(2);
  })
}

convert();