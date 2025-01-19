// import React from 'react'
import { useNavigate } from "react-router"
import style from "../styles/Map.module.css"

function Map() {
  const navigate = useNavigate();
  const latVal = "34.47443328617457";
  const lngVal = "103.36212158203125";

  function handleClick(){
        return navigate(`form?lat=${latVal}&lng=${lngVal}`);
  }
  return (
    <div className={style.map}>
        <button onClick={handleClick} >Click Me</button>
        </div>
  )
}

export default Map;