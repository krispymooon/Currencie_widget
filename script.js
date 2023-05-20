// API для получения курсов валют
const url = "https://api.exchangerate-api.com/v4/latest/RUB";
// Получаем курсы валют из API
try {
    fetch(url)
    .then(response => response.json())
    .then(data => {
        // Обновляем значения курсов валют в HTML
        document.querySelector("#rub-to-usd").innerHTML = (1/ data.rates.USD).toFixed(4);
        document.querySelector("#rub-to-eur").innerHTML = (1/ data.rates.EUR).toFixed(4);
        })
        .catch(error => {
            console.error('Ошибка при получении данных о курсах валют:', error);
    });
    } catch (error) {
    console.error('Ошибка при получении курса валют:', error);
    document.querySelector('#rub-to-usd').textContent = 'Error';
    document.querySelector('#rub-to-eur').textContent = 'Error';
}


