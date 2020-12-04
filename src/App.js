import React, {useState, useEffect} from 'react';
import './App.css';
import { FormControl, MenuItem, Select, Card, CardContent } from '@material-ui/core';
import InfoBox from './InfoBox';
import Mapp from './Mapp';
import Table from './Table';
import LineGraph from './LineGraph';
import { sortData } from './util';
import 'leaflet/dist/leaflet.css' ;

function App() {
  //variable in react
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData,setTableData] = useState([]);

  const [mapCenter, setMapCenter] = useState({lat:34.80746, lng: -40.4796});
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);

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
          
          const sortedData = sortData(data);
          setTableData(sortedData);
          setCountries(countries);
          setMapCountries(data);
        });
    };
    getCountriesData();
  }, []);

  useEffect(() => {
      fetch ('https://disease.sh/v3/covid-19/all')
        .then((response) => response.json())
        .then((data) =>{
          setCountryInfo(data);
        });
  },[]);

  const onCountryChange = async (e) => {
    const updated_countryCode = e.target.value;
    setCountry(updated_countryCode);
    
    const url = updated_countryCode === 'worldwide' 
      ? 'https://disease.sh/v3/covid-19/all'
      : `https://disease.sh/v3/covid-19/countries/${updated_countryCode}`;
    
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        //only the country code
        setCountry(updated_countryCode);
        //all of countrydata
        setCountryInfo(data);
        // map center
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
      });
  };
  // console.log("INFO------->", countryInfo);

  return (
    //bem class naming convention
    <div className="app">
      
      <div className='app__left'>
        
        <div className='app__header'>
          <h1>COVID-19 TRACKER</h1>
          <FormControl className='app__header__form'>
            <Select variant='outlined' onChange={onCountryChange} value={country}>
              
              <MenuItem value='worldwide'>WorldWide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}

            </Select>
          </FormControl>
        </div>

        <div className='app__stats'>
          <InfoBox title='CoronaVirus Cases' 
            cases={countryInfo.todayCases} 
            total={countryInfo.cases} />
          <InfoBox title='Recovered' 
            cases={countryInfo.todayRecovered} 
            total={countryInfo.recovered} />
          <InfoBox title='Deaths' 
            cases={countryInfo.todayDeaths} 
            total={countryInfo.deaths} /> 
        </div>
         
        <Mapp countries={mapCountries} center={mapCenter} zoom={mapZoom} />

      </div>

      <Card className='app__right'>
        
        <CardContent>
          <h3>Live Cases By Country</h3>
          <Table countries={tableData} />
          
          <h3>Worldwide Overview </h3>

          {/* <h6>Total Cases</h6> */}
          <LineGraph />
          
          {/* <h6>Recovered</h6> */}
          {/* <LineGraph caseType='recovered' bg_col='#66ff66' border_col='#009900' /> */}

          {/* <h6>Deaths</h6> */}
          {/* <LineGraph caseType='deaths' /> */}

        </CardContent>

      </Card>

    </div>
  );
}

export default App;
