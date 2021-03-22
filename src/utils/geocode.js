const request = require('request')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoibG9sb2xvbGFpbG9sYSIsImEiOiJja21nbDluZWYzMHcwMm9sYTJ3OWNueXFuIn0.a9FMp2CWItJ8hbeULbwCzA&limit=1`

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to the geocode service', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location!. Try another search', undefined)
        } else {
            callback(undefined, {
                ciudad: body.features[0].place_name,
                latitud: body.features[0].center[1],
                longitud: body.features[0].center[0]
            })
        }
    })
}

module.exports = geocode