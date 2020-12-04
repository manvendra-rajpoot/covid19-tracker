import React  from 'react';
import './Mapp.css';
import { Map as LeafletMap , TileLayer } from 'react-leaflet';
import { showDetailsOnMap } from './util';

function Mapp({countries, casesType, center, zoom}) {
    return (
        <div className='map'>

            <LeafletMap center={center} zoom={zoom}>
                <TileLayer attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            
            {/* Loop through all countries and draw circle on map */
            /* Bigger circle more cases !*/}
            {showDetailsOnMap(countries, casesType)}


            </LeafletMap>
        </div>
    )
}

export default Mapp;
