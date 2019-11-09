
const request = require('request')

const geocode=(address, callback)=>{
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1Ijoic2hpa2hhcjAyMDgiLCJhIjoiY2sxbWk3NHU1MDB6cDNib2R6NG12Mnc2aCJ9.6BjvXsVXf4OMGHxKDfYZiw" 
     
    request({url: url,json:true}, (error, {body})=>{     // by shorthand url: url can also written as only url
        if(error){
            callback('Unable to connect to location services',undefined)
        }
        else if(body.features.length===0){
            callback('Unable to find location. Try another search.',undefined)
        }
        else{
             callback(undefined,{
                 latitude: body.features[0].center[1],
                 longitude: body.features[0].center[0],
                 location: body.features[0].place_name
             })
        }
    })
 }
 
 module.exports = geocode