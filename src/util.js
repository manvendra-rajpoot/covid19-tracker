import React from 'react';
import numeral from 'numeral';
import {Circle, Popup} from 'react-leaflet';

const casesTypeColors={
    cases:{
        hex:"#cc1035",
        rgb: "rgb(204, 16, 52)",
        half_op: "rgba(204, 16, 52, 0.5)",
        multiplier: 800,
    },
    recovered: {
        hex: "#7dd71d",
        rgb: "rgb(125, 215, 29)",
        half_op: "rgba(125, 215, 29, 0.5)",
        multiplier: 1000,
    },
    deaths: {
        hex: "#fb4443",
        rgb: "rgb(251, 68, 67)",
        half_op: "rgba(251, 68, 67, 0.5)",
        multiplier: 1500,
    },
};



//Sorting countries by cases 
export const sortData = (data) => {
    const sortedData = [...data];
    
    // sortedData.sort((a,b) => {
    //     if(a.cases < b.cases){
    //         return 1;
    //     } else {
    //         return -1;
    //     }
    // });
    sortedData.sort((a,b) => ( (a.cases < b.cases) ? 1 : -1 ));
    return sortedData;
};


export const makePrettierToday = (stats) => stats ? `+${numeral(stats).format('0.0a')}` : '+0';
export const makePrettierTotal = (stats) => stats ? `${numeral(stats).format('0.0a')}` : '+0';

//DRAW circles on Map with interactive tooltips
export const showDetailsOnMap = (data, casesType='cases') => (
    data.map((country) => (
        <Circle center={[country.countryInfo.lat, country.countryInfo.long]}
            color={casesTypeColors[casesType].hex}
            fillOpacity={0.5} 
            fillColor={casesTypeColors[casesType].hex}
            radius={Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier}
        >
            <Popup>
                <div className='info_container'>
                    <div className='info_flag'
                        style={{backgroundImage: `url(${country.countryInfo.flag})`}} >
                    </div>
                    <div className='info_name'>
                        {country.country}
                    </div>
                    <div className='info_cases'>
                        Total Cases: {numeral(country.cases).format('0,0')}
                    </div>
                    <div className='info_recovered'>
                        Recoverd: {numeral(country.recovered).format('0,0')}
                    </div>
                    <div className='info_deaths'>
                        Deaths: {numeral(country.deaths).format('0,0')}
                    </div>
                </div>
            </Popup>
        </Circle>
    ))
);