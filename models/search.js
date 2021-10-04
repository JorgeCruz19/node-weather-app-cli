const axios = require('axios')

class Search {

  record = [];

  constructor () {
    // TODO: leer DB si existe
  }
  get paramsMapbox() {
    return {
      'access_token': process.env.MAPBOX_KEY,
      'limit': 5,
      'language': 'es'
    }
  }
  get paramsOpenWeather() {
    return {
      'appid': process.env.OPENWEATHER_KEY,
      'units': 'metric',
      'lang': 'es'
    }
  }

  async city( place = '' ){
    try {
      const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
        params: this.paramsMapbox
      });
      //request http
      const res = await instance.get()
      return res.data.features.map(place => ({
        id: place.id,
        name: place.place_name,
        lng: place.center[0],
        lat: place.center[1],
      }));

    } catch (error) {
      return [];
    }
  }

  async cityWeather(lat = 0, lon = 0){
    try {
      const instance = axios.create({
        baseURL: `https://api.openweathermap.org/data/2.5/weather`,
        params: {...this.paramsOpenWeather, lat, lon}
      });
      //request http
      const res = await instance.get()
      const {weather, main} = res.data;
      return {
        description: weather[0].description,
        temp: main.temp,
        temp_min: main.temp_min,
        temp_max: main.temp_max
      }

    } catch (error) {
      return [];
    }
  }

  addRecord(place=''){

    if (this.record.includes(place.toLocaleLowerCase() )) {
      return; 
    }

    this.record.unshift(place.toLocaleLowerCase())
  }

}


module.exports = Search