const request  = require('request')



const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoibmFiaWwtYWhtZWQiLCJhIjoiY2thcWc3M3FxMW5kNjJ5cW11azFhMnh3ZiJ9.yT2XKgs-3SY3Pk2NI-d1Dg&limit=1'

    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback('Something went wrong!',undefined)
        } else if(body.features.length === 0) {
            callback('Something went wrong!',undefined)  
        } else {
            callback(undefined, {
                longitude: body.features[0].geometry.coordinates[0],
                latitude: body.features[0].geometry.coordinates[1],
                place: body.features[0].place_name
            })
        }
    })
}


module.exports = geocode