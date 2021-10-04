require('dotenv').config();

const { inquirerMenu ,readInput, pause, listPlaces } = require('./helper/inquirer');
const Search = require('./models/search');

const main = async () => {
  let opt = null;

  const search = new Search;
  
  do {
    opt = await inquirerMenu();
    
    switch (opt) {
      case 1:
        //Show message
        const term = await readInput('Ciudad: ');
        //Search places
        const places = await search.city(term); 
        //to select a place
        const id = await listPlaces(places);
        if (id === '0') continue;

        //Save DB
        const placeSelected = places.find( place => place.id === id);
        search.addRecord(placeSelected.name)
        //Weather
        const { lat, lng } = placeSelected;
        const weather = await search.cityWeather(lat, lng)
        //show results
        console.clear();
        console.log('\nInformación de la ciudad \n'.green);
        console.log('Ciudad: ',placeSelected.name.green );
        console.log('Lat: ', placeSelected.lat);
        console.log('Lng: ', placeSelected.lng);
        console.log('Temperatura: ', weather.temp);
        console.log('Mínima: ', weather.temp_min);
        console.log('Máxima: ', weather.temp_max);
        console.log('Descripción: ', weather.description.green);

        break;
      case 2:
        search.record.forEach((place, i) => {

          const idx = `${i + 1}`.green
          console.log(`${idx} ${place}`);

        })

        break;
      case 0:
        break;
    }


    await pause();
  } while (opt !== 0);
}

main();