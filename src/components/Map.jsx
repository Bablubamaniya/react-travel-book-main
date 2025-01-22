// import React from 'react'
// import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import style from "../styles/Map.module.css";
import { MapContainer, Popup, useMap, useMapEvents } from "react-leaflet";
import { TileLayer } from "react-leaflet";
import { Marker } from "react-leaflet";
import { useCities } from "../context/CityContext";
import { useNavigate } from "react-router";
import useCurrentCoords from "../hooks/useCurrentCoords";

const newYorkCoords = [40.712776,-74.005974];
function Map() {
    // 23.259933, and the longitude is 77.412613
    const [centerPos, setCenterPos] = useState([23.259933, 77.412613]);
    const { cities, city } = useCities();
    
    const {position:currentPosition} = useCurrentCoords(...newYorkCoords);

//change center
// case1 : User allow to for his Current Location
    useEffect(
        function(){
            setCenterPos(currentPosition)
        },
        [currentPosition]
    );

    useEffect(
        function () {
            setCenterPos(function (centerPos) {
                if (city.position?.lat && city.position?.lng)
                    return [city.position.lat, city.position.lng];
                else return centerPos;
            });
        },
        [city]
    );

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
                <ChangeCenter position={centerPos} />
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
    return null;
}
function ChangeCenter({ position }) {
    const map = useMap();
    map.setView(position);
    return null;
}

export default Map;
