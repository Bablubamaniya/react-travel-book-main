// import React from 'react'
// import { useNavigate } from "react-router";
import { useState } from "react";
import style from "../styles/Map.module.css";
import { MapContainer, Popup, useMapEvents } from "react-leaflet";
import { TileLayer } from "react-leaflet";
import { Marker } from "react-leaflet";
import { useCities } from "../context/CityContext";
import { useNavigate } from "react-router";

function Map() {
    // 23.259933, and the longitude is 77.412613
    const [centerPos, setCenterPos] = useState([23.259933, 77.412613]);
    const { cities } = useCities();

    return (
        <div className={style.mapContainer}>
            <MapContainer
                className={style.map}
                center={centerPos}
                zoom={5}
                scrollWheelZoom={true}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
                />
                <ListenMapClick />
                {cities.map(function (city) {
                    return (
                        <Marker
                            position={[city.position.lat, city.position.lng]}
                            key={city.id}
                        >
                            <Popup>
                                <span>
                                    {city.emoji}&nbsp;&nbsp;&nbsp;
                                    {city.cityName}
                                </span>
                            </Popup>
                        </Marker>
                    );
                })}
            </MapContainer>
        </div>
    );
}
function ListenMapClick() {
    const navigate = useNavigate();
    useMapEvents({
        click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
    });
}

export default Map;
