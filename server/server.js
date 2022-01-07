require('dotenv').config({path: '../.env'});
const path = require('path');

const express = require('express');
const axios = require("axios");

const PORT = process.env.PORT || 3001;
const IPKEY = process.env.IPKEY;
const MOVIEDBKEY = process.env.MOVIEKEY;

const app = express();
app.use(express.static(path.resolve(__dirname, '../stream-search/build')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../stream-search/build', 'index.html'));
});
//IP Registery API
app.get("/api/ip", (req, res) => {
    let countryCode = '';
    axios.get("https://api.ipregistry.co/",{
        params: {
          key: IPKEY,
        }
      })
    .then((response) => {
        countryCode = response.data.location.country.code;
        res.send(countryCode ? countryCode: "CA");
    })
    .catch((error) => {
        console.log(error);
    })
  });

//MovieDB API
app.get("/api/movie", (req, res) => {
    axios.get("https://api.themoviedb.org/3/search/movie",{
        params: {
          api_key: MOVIEDBKEY,
          query: req.query.name
        }
      })
    .then((response) => {
        let result = response.data.results.length;
        if(result != 0){
            res.json(response.data.results[0].id)
        }
    })
})

app.get("/api/movieId", (req, res) => {
  axios.get("https://api.themoviedb.org/3/movie/"+req.query.id,{
    params: {
      api_key: MOVIEDBKEY,
    }
  })
.then((response) => {
    res.send(response.data)
})
.catch((error) => {
  console.log(error)
})
})

app.get("/api/stream", (req, res) => {
  let movieId = req.query.id;
  let countryCode = req.query.code;
  axios.get("https://api.themoviedb.org/3/movie/" + movieId + "/watch/providers",{
    params: {
      api_key: MOVIEDBKEY,
    }
  })
.then((response) => {
    if(typeof(response.data.results) != "undefined"){
      //console.log(res.data.results[countryCode])
      if(response.data.results[countryCode].flatrate != "undefined"){
      const services = response.data.results[countryCode].flatrate;
      let stringServices = [];
      for(var i=0; i< services.length; i++){
        stringServices.push(services[i].provider_name);
      }
      res.send(stringServices);
    }else{
      stringServices.push("Not Available on any Platform!")
      res.send(stringServices);
    }
  }
})
})

app.listen(PORT, () => {
    console.log(`Server Listening on ${PORT}`);
})