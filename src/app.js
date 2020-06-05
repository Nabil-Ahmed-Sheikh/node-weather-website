const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast') 

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Nabil Ahmed'
    })
})



app.get('/help', (req, res) => {
    res.render('help', {
        title: 'I love helping',
        name: 'Nabil'
    })
})

app.get('/help/*', (req, res) => {
    res.render('help', {
        title: 'Oh!',
        name: 'Nabil',
        message: 'Help article not found'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Weather',
        name: 'Nabil'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide a search address'
        })
    }
    const place = req.query.address

    geocode(place, (error, {latitude, longitude, place} = {}) =>{
        if(error){
            return res.send({
                error: error
            })    
        }

        forecast(longitude, latitude, (error, forecastData) => {
            if(error) {
                return res.send({
                    error: error
                }) 
            }
        
            res.send({
                forecast: "The current temparerature is "+forecastData.temp+" degree celcius. The situation is "+ forecastData.weather[0].main
                 +". And the humidity is "+forecastData.humidity +"%",
                location: place
            })
        })
    })

    
})

app.get('*', (req, res) => {
    res.render('404page',{
        title: 'error 404',
        message: 'Page not found',
        name: 'Nabil'
    })
})

app.listen(3000 , () => {
    console.log('Server is up on port 3000');    
})

