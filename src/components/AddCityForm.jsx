import { useEffect, useState } from "react";
import { useCities } from "../context/CityContext";
import useQueryParams from "../hooks/UseQueryParams";
import styles from "../styles/AddCityForm.module.css";
import BackButton from "./BackButton";
import Message from "./Messege";
import Spinner from "./Spinner";
import { formatDate, formatDateForInputValue, getFlagEmoji } from "../helper";
import { useNavigate } from "react-router";
const BASE_URL = `https://api.bigdatacloud.net/data/reverse-geocode-client`;

function AddCityForm() {
    const { handleAddCity, loading: apiLoading } = useCities();
    const [isLoading, setIsLoading] = useState(false);
    const [cityNotFound, setCityNotFound] = useState(false);
    const [error, setError] = useState(null);
    const [lat, lng] = useQueryParams("lat", "lng");
    const navigate = useNavigate();

    const [cityDetails, setCityDetails] = useState({
        cityName: "",
        country: "",
        emoji: "",
        date: new Date().toISOString(),
        notes: "",
        position: {
            lat: "",
            lng: "",
        },
    });

    useEffect(
        function () {
            async function fetchCityDetails() {
                try {
                    setIsLoading(true);
                    const url = `${BASE_URL}?latitude=${lat}&longitude=${lng}`;
                    const response = await fetch(url);
                    const data = await response.json();
                    const cityName = data.city;

                    console.log(data);

                    if (!cityName) {
                        setCityNotFound(true);
                        resetCityDetails();
                        return;
                    }

                    setCityDetails(function (cityDetails) {
                        const cityName = data.city || data.locality;

                        const updatedCityDetails = {
                            ...cityDetails,
                            cityName: data.city || data.locality,
                            county: data.countyName,
                            emoji: getFlagEmoji(data.countryCode),
                            note: `A note about ${cityName}`,
                            position: {
                                lat: lat,
                                lng: lng,
                            },
                        };

                        return updatedCityDetails;
                    });
                } catch (error) {
                    setError(error.message);
                } finally {
                    setIsLoading(false);
                }
            }
            if (lat && lng) fetchCityDetails();
        },
        [lat, lng]
    );

    function handleDateChange(e) {
        setCityDetails(function (cityDetails) {
            return {
                ...cityDetails,
                date: new Date(e.target.value).toISOString(),
            };
        });
    }
    function resetCityDetails() {
        return setCityDetails({
            cityName: "",
            country: "",
            emoji: "",
            date: new Date().toISOString(),
            notes: "",
            position: {
                lat: "",
                lng: "",
            },
        });
    }
    function handleNotesChange(e) {
        setCityDetails(function (cityDetails) {
            return { ...cityDetails, notes: e.target.value };
        });
    }
    async function handleSubmit(e) {
        e.preventDefault();
        await handleAddCity(cityDetails);
        navigate("/app/cities");
    }
    if (isLoading) {
        return <Spinner />;
    }

    if (!lat || !lng || cityNotFound) {
        return <Message emoji="😯" txt="Opps! No city found!" />;
    }

    if (error) {
        return <Message emoji="💥" txt={error} />;
    }
    return (
        <div
            className={`${styles.addCityForm} ${
                apiLoading ? styles.deactivat : ""
            }`}
        >
            S
            <form onSubmit={handleSubmit}>
                <div>
                    <label>City name</label>
                    <input
                        type="text"
                        defaultValue={cityDetails.cityName}
                        disabled={true}
                    />
                </div>
                <div>
                    <label>When did you go to #cityName</label>
                    <input
                        type="date"
                        value={formatDateForInputValue(cityDetails.date)}
                        onChange={handleDateChange}
                    />
                </div>
                <div>
                    <label>How was your experience !</label>
                    <textarea
                        rows="4"
                        cols="50"
                        onChange={handleNotesChange}
                        value={cityDetails.notes}
                    />
                </div>
                <div className={styles.buttonBox}>
                    <BackButton />
                    <button type="primary">Add</button>
                </div>
            </form>
        </div>
    );
}
export default AddCityForm;
