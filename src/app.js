const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

const port = process.env.PORT || 3000

// Defines paths for Express config
const address = path.join(__dirname, '../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(address))  // it takes address as an argument
app.use(bodyParser.urlencoded({ extended: true }));

 // app.get function take 2 arg i.e.- 1. route/url and 2nd is a function which decide what to do when this particular route is visited 

app.get('',(req,res) =>{
    res.render('index',{
        title: 'Weather App',
        name: 'Shikhar Rastogi'
    })
})

app.get('/about',(req,res) =>{
    res.render('about',{
        title: 'About me',
        name: 'Shikhar Rastogi'
    })
})

app.get('/help', (req,res)=>{
    res.render('help',{
        title: 'Help',
        message: 'This is some helpful text',
        name: 'Shikhar Rastogi'
    })
})

 app.get('/weather',(req,res) =>{
    if(!req.query.address){
        return(res.send({
            error: 'Address must be required!!'
        }))
    }

        geocode(req.query.address,(error,{latitude,longitude,location} = {})=>{
            if(error){
                return(res.send({
                    error
                }))
            }
            forecast(latitude, longitude, (error, forecastData) => {
                if(error){
                    return res.send({error})
                }
                res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address
                })
              })
        })

})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return(res.send({
            error: 'You must provide a search term.'
        }))
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*',(req,res)=>{
    res.render('error',{
        title: 'Error 404',
        message: 'Help article not found!!',
        name: 'Shikhar Rastogi'
    })
})

// if URL not matched it will show an error message 
app.get('*',(req,res)=>{
    res.render('error',{
        title: 'Error 404',
        message: 'Page not found!!',
        name: 'Shikhar Rastogi'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})