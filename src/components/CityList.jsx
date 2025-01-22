import CityItem from "./CityItem";
import styles from "../styles/cityList.module.css";
import { useCities } from "../context/CityContext";
import Spinner from "./Spinner";

function CityList() {
    const {cities,loading:apiLoading,city:activeCity}=useCities();
    if(apiLoading){
        return <Spinner />
    }
    return (
        <ul className={styles.cityList}>
            {cities.map(function (city) {
                return <CityItem city={city} key={city.id} active={city.id == activeCity.id} />;
                
            })}
        </ul>
      
    );
}

export default CityList;