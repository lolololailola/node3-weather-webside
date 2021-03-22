const request = require('request')

const openWeather = (latitud, longitud, callback) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitud}&lon=${longitud}&units=metric&appid=cfbe300110e0a4233d917e209cb769d5`

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to the openWeather service', undefined)
        } else if (body.cod === 400) {
            callback('Unable to find location!. Try another search', undefined)
        } else {
            callback(undefined, 
                `Temperatura: ${body.main.temp} , Humedad: ${body.main.humidity}`)
            }
    })
}

module.exports = openWeather