const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const request = require('request');

const apiKey = 'de649ef12d17f15dc5a20c789cc347f3';

app.set('view engine', 'ejs')
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  // res.send('Hello World!')
  res.render('index', {weather: '', error: null});
});

app.post('/', function (req, res) {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
request(url, function (err, response, body) {
    if(err){
      res.render('index', {weather: null, error: 'Error, please try again'});
    } else {
      let weather = JSON.parse(body)
      if(weather.main == undefined){
        res.render('index', {weather: null, error: 'Error, please try again'});
      } else {
        x = parseInt((weather.main.temp -32) * 5 / 9);
        let weatherText = `It's ${x} degrees in ${weather.name}!`;
        res.render('index', {weather: weatherText, error: null});
      }
    }
  });
})

app.listen(8000, () => {
  console.log('Example app listening on port 8000!')
});