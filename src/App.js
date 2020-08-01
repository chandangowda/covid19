import React, { useState, useEffect } from 'react';
import './App.css';
import { FormControl, Select, MenuItem, CardContent, Card } from '@material-ui/core';
import InfoBox from './InfoBox';
import Map from './Map';


function App() {

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');

  useEffect(() => {

    const getCountriesData = async () => {
      await fetch('https://disease.sh/v3/covid-19/countries')
        .then(response => response.json())
        .then(data => {
          const countries = data.map(country => (
            {
              name: country.country,
              value: country.countryInfo.iso2
            }
          ))
          setCountries(countries);
        })
    }

    getCountriesData();

  }, [])

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);
  }

  return (
    <div className="app">
      <div className="app__left">
        
        <div className="app__header">
          <h1> COVID 19 tracker 🎢   </h1>
          <FormControl className="app__dropdown">

            <Select variant="outlined" onChange={onCountryChange} value={country}>
              <MenuItem value="worldwide">WorldWide</MenuItem>
              {
                countries.map((country, index) => (

                  <MenuItem key={index} value={country.value}>{country.name}</MenuItem>
                ))
              }


            </Select>
          </FormControl>
          
        </div>
        <div className="app__stats">
            <InfoBox title="Coronavirus cases" cases="123" total="2000" ></InfoBox>
            <InfoBox title="Recovered" cases="13" total="2000"></InfoBox>
            <InfoBox title="Deaths" cases="12cases" total="2000"></InfoBox>
          </div>
          <Map></Map>
      </div>
      <Card className="app_right">
         <CardContent>
           <h3>Live cases by country</h3>
           <h3>Live cases by country</h3>

           </CardContent>  
       
      </Card>
    </div>
    
  );
}

export default App;
