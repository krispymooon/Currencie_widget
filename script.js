// API для получения курсов валют
const url = "https://api.exchangerate-api.com/v4/latest/RUB";

// Получаем все элементы с классом 'rate'
var rateElements = document.querySelectorAll('.rate');

// Получаем список доступных кодов стран из API
fetch(url)
    .then(response => response.json())
    .then(data => {
        var availableCurrencies = Object.keys(data.rates);

        // Проверяем каждый элемент на корректность кода страны
        rateElements.forEach(element => {
            var currencyFrom = element.querySelector('.currency-from').getAttribute('data-currency');
            var currencyTo = element.querySelector('.currency-to').getAttribute('data-currency');

            // Проверяем коды стран на их наличие в списке доступных кодов
            if (!availableCurrencies.includes(currencyFrom) || !availableCurrencies.includes(currencyTo)) {
                // Выводим сообщение или alert при обнаружении некорректного кода страны
                //alert("Некорректный код страны!");
                // Можно также изменить текст или стиль элементов для отображения ошибки
                element.innerHTML = "Ошибка: некорректный код страны";
                return; // Прерываем проверку для данного элемента
            }

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
    .catch(error => {
        console.error('Ошибка при получении курса валют:', error);
        rateElements.forEach(element => {
            element.textContent = 'Ошибка при получении курса валют';
        });
    });
