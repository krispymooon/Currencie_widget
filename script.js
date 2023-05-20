// API для получения курсов валют
const url = "https://api.exchangerate-api.com/v4/latest/RUB";

// Получаем все элементы с классом 'rate'
// Получаем все элементы с классом 'rate'
var rateElements = document.querySelectorAll('.rate');

// Получаем курсы валют из API
try {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            rateElements.forEach(element => {
                var currencyFrom = element.querySelector('.currency-from').getAttribute('data-currency');
                var currencyTo = element.querySelector('.currency-to').getAttribute('data-currency');

                // Рассчитываем курс валюты, учитывая различные комбинации валют
                var rate;
                if (currencyFrom === 'RUB') {
                    rate = data.rates[currencyTo];
                } else if (currencyTo === 'RUB') {
                    rate = 1 / data.rates[currencyFrom];
                } else {
                    rate = data.rates[currencyTo] / data.rates[currencyFrom];
                }

                element.innerHTML = `${currencyFrom} to ${currencyTo}: ${rate.toFixed(4)}`;
            });
        })
} catch (error) {
    console.error('Ошибка при получении курса валют:', error);
    rateElements.forEach(element => {
        element.textContent = 'Error';
    });
}


