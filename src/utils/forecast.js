const request = require('request')

const forecast=(longitude, latitude, callback)=>{
    
    const url= "https://api.darksky.net/forecast/247360804c6d7661de66dd7f6888ef27/"+ longitude +','+ latitude + '?units=auto'

    request({url, json: true},(error, {body})=>{    // by shorthand url: url can also written as only url
        if(error){
            callback('Unable to connect to weather services',undefined)
        }
        else if(body.error){
            callback('Unable to find location',undefined)
        }
        else{
            callback(undefined,body.daily.data[0].summary+' It is currently ' + body.currently.temperature + ' degree Celsius. ' + 'There is a ' + body.currently.precipProbability + ' % chance of rain.')
        }
    })
}

    module.exports = forecast