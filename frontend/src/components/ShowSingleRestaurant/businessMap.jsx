// react-google-maps
// code template from:
// https://react-google-maps-api-docs.netlify.app/
// https://www.npmjs.com/package/@react-google-maps/api

import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const containerStyle = {
    width: '400px',
    height: '400px'
} 

const BusinessMap = ({ lat, lng }) => {
    // const [apiKey, setApiKey] = useState(process.env.REACT_APP_MAP_API)
    const apiKey = process.env.REACT_APP_MAP_API

    const center = {lat:lat, lng:lng}
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