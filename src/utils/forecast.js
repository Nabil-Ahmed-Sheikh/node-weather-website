const request = require('request')


const forecast = (long, lat, callback) => {
    const url = 'https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+long+'&exclude=hourly,daily&appid=1ae8ea7e8c74acda50295d020ef2ba43&units=metric'

    

    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback('Something went wrong!', undefined)
        } else if (body.cod) {
            callback('Something went wrong!', undefined)
        } else {
            callback(undefined, body.current)
        }
    })
}

module.exports = forecast