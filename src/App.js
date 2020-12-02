import React, {useState, useEffect} from 'react';
import './App.css';
import { FormControl, MenuItem, Select } from '@material-ui/core';
import InfoBox from './InfoBox';

function App() {
  //variable in react
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  
  //useEffect() is a powerful `hook` in react to 
  //run a piece of  code based on a condition
  useEffect(() => {
    //code here only run once after when component loads
    //and after only if input var change
    //'async': send a req, wait for it, do something with info
    const getCountriesData = async () => {
      await fetch('https://disease.sh/v3/covid-19/countries')
      .then((response) => response.json())
      .then((data) => {
        const countries = data.map((country) => (
          {
            name: country.country,
            value: country.countryInfo.iso2,
          }
        ));
        setCountries(countries);
      });
    };
    getCountriesData();
  }, []);

  const onCountryChange = async (e) => {
    const updated_countryCode = e.target.value;
    setCountry(updated_countryCode);
    console.log('Updated one: '+updated_countryCode);
  }

  return (
    //bem class naming convention
    <div className="app">
      <div className='app__header'>
        <h1>COVID-19 TRACKER</h1>
        <FormControl className='app__header'>
          <Select variant='outlined' 
            onChange={onCountryChange}
            value={country}>
            <MenuItem value='worldwide'>WorldWide</MenuItem>
            {countries.map((country) => (
              <MenuItem value={country.value}>{country.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <div className='app__stats'>
        <InfoBox title='CoronaVirus Cases' cases={508} total={5000} />
        <InfoBox title='Recovered' cases={201} total={500} />
        <InfoBox title='Deaths' cases={98} total={89} /> 
      </div>


      {/* Table */}
      {/* Graphs */}

      {/* Map */}

    </div>
  );
}

export default App;
