// API для получения курсов валют
const url = "https://api.exchangerate-api.com/v4/latest/RUB";

// Получаем все элементы с классом 'currency-rate'
var currencyElements = document.querySelectorAll('.currency-rate');

// Получаем курсы валют из API
try {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Обновляем значения курсов валют в HTML
            currencyElements.forEach(element => {
                var currency = element.getAttribute('data-currency');
                var rate = (1 / data.rates[currency]).toFixed(4);
                var text = element.innerText;
                var updatedText = text.replace(/to [A-Z]+/, `to ${currency}`);
                element.innerHTML = currency.valueOf() + ":  " + updatedText.replace(/loading\.\.\./, rate);
            });
        })
} catch (error) {
    console.error('Ошибка при получении курса валют:', error);
    currencyElements.forEach(element => {
        element.textContent = 'Error';
    });
}
