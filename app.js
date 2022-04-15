var express = require("express");
var app = express();
var path = require('path');
const PORT =process.env.PORT || 5000;
app.use(express.static('public'));
//otetaan ejs käyttöön
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));

//xhr2kirjasto :D
var XMLHttpRequest = require('xhr2');
var xhr = new XMLHttpRequest();


app.locals.pretty = true;

//index page
app.get("/", function (req, res) {
  res.render("pages/index");
});


//haetaan leffadata
var request = new XMLHttpRequest()
request.open('GET', 'https://ghibliapi.herokuapp.com/films', true)
var listData 
request.onload = function () {
  
  listData = JSON.parse(this.response)
  if (request.status >= 200 && request.status < 400) {
    listData.forEach(movie => {
      console.log(movie.title)

    })
  } else {
    console.log('error')
  }
  console.log(listData);
}

request.send()


//films sivu
app.get("/films", function (req, res) {
  res.render('pages/films', {myData: listData });

});
//kuuntelee porttia
app.listen(PORT);
console.log(PORT + " kuunnellaan juu");