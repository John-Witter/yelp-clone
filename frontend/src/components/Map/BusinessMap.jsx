// react-google-maps
// code template from:
// https://react-google-maps-api-docs.netlify.app/
// https://www.npmjs.com/package/@react-google-maps/api

import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import '../ShowSingleRestaurant/ShowSingleRestaurant.css'

const containerStyle = {
    width: '20rem',
    height: '25rem'
}

const BusinessMap = ({ lat, lng }) => {
    const apiKey = process.env.REACT_APP_MAP_API

    const center = { lat: lat, lng: lng }
    return (
        <div className="business-map">
            <LoadScript googleMapsApiKey={apiKey}>
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={18}
                >
                    <></>
                </GoogleMap>
            </LoadScript>
        </div>
    )
}

export default React.memo(BusinessMap)