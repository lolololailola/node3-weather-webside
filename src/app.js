const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const openWeather = require('./utils/openWeather')


const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup hendlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Lolo Lol'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Lolo Lol'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Lo siento, no puedo ayudarte en nada.',
        title: 'Help',
        name: 'Lolo Lol'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error:'You must provide a address!'
        })
    }

    geocode(req.query.address, (error, { ciudad, latitud, longitud } ={}) => {
        if (error) {
            return res.send({ error })
        } 
        
        openWeather(latitud, longitud, (error, openWeatherData) => {
            if (error) {
                return res.send({ error }) 
            } 

            res.send({
                ciudad,
                openWeatherData
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Lolo Lol',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Lolo Lol',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})