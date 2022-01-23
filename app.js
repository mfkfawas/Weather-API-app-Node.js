const dotenv = require('dotenv')
dotenv.config({ path: './.env' })
const express = require('express')
const https = require('https')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.post('/', (req, res) => {
  city = req.body.cityName
  apiKey = process.env.API_KEY
  url =
    'https://api.openweathermap.org/data/2.5/weather?q=' +
    city +
    '&appid=' +
    apiKey +
    '&units=metric#'

  https.get(url, (response) => {
    console.log(response.statusCode)

    response.on('data', (data) => {
      const weatherData = JSON.parse(data)
      const temp = weatherData.main.temp
      const weatherDescription = weatherData.weather[0].description
      const iconURL =
        'http://openweathermap.org/img/wn/' +
        weatherData.weather[0].icon +
        '@2x.png'

      res.set('Content-Type', 'text/html')
      res.write(
        '<h2>The weather in ' + city + ' is ' + temp + ' degree celsius.<h2>'
      )
      res.write('<h3>Weather description is ' + weatherDescription + '.</h3>')
      res.write('<img src = ' + iconURL + '>')
      res.send()
    })
  })
})

app.listen('3000', (req, res) => {
  console.log('3000')
})
