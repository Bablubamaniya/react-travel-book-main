import { createContext, useContext, useEffect, useReducer } from "react";
import {
    getCity,
    getCities,
    createCity,
    updateCity,
    deleteCity,
} from "../servieces/apiCities";

const initialState = {
    cities: [],
    city: null,
    loading: false,
    error: null,
};
const reducer = function (cState, action) {
    switch (action.type) {
        case "cities/load": {
            const cities = action.payload;
            return { ...cState, cities: cities, loading: false };
        }
        case "city/load": {
            const city = action.payload;
            return { ...cState, city: city, loading: false };
        }

        case "city/update": {
            const id = action.payload.id;
            const newCity = action.payload.newCity;
            return {
                ...cState,
                cities: cState.cities.map(function (city) {
                    if (city.id == id) return newCity;
                    else return city;
                }),
                loading: false,
            };
        }

        case "city/delete": {
            const id = action.payload;
            return {
                ...cState,
                cities: cState.cities.filter(function (city) {
                    if (city.id == id) return false;
                    else return true;
                }),
                loading: false,
            };
        }

        case "city/create": {
            const newCity = action.payload;
            return {
                ...cState,
                cities: [...cState.cities, newCity],
                loading: false,
            };
        }
        case "error": {
            const error = action.payload;
            return { ...cState, error: error, loading: false };
        }
        case "loading": {
            return { ...cState, loading: false };
        }
        default:
            return new Error(`no Action found with the neme: '${action.type}'`);
    }
};

const CitiesContext = createContext();

const CitiesProvider = function ({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { cities, city, loading, error } = state;

    useEffect(function () {
        async function loadCities() {
            try {
                dispatch({ type: "loading" });
                const data = await getCities();
                dispatch({ type: "cities/load", payload: data });
            } catch (error) {
                dispatch({ type: "error", payload: error.messege });
            }
        }
        loadCities();
    }, []);

    async function handleLoadCity(id) {
        try {
            startLoading();
            const data = await getCity(id);
            dispatch({ type: "city/load", payload: data });
        } catch (error) {
            dispatch({ type: "error", payload: error.messege });
        }
    }

    async function handleAddCity(newCity) {
        try {
            startLoading();
            const data = await createCity(newCity);
            dispatch({ type: "city/create", payload: data });
        } catch (error) {
            dispatch({ type: "error", payload: error.messege });
        }
    }

    async function handleRemoveCity(id) {
        try {
            startLoading();
            await deleteCity(id);
            dispatch({ type: "city/delete", payload: id });
        } catch (error) {
            dispatch({ type: "error", payload: error.messege });
        }
    }

    async function handleEditCity(updateCity, id) {
        try {
            startLoading();
            const data = await updateCity(updateCity, id);
            dispatch({
                type: "city/update",
                payload: { id: id, newCity: data },
            });
        } catch (error) {
            dispatch({ type: "error", payload: error.messege });
        }
    }
    function startLoading() {
        dispatch({ type: "loading" });
    }

    const valueObj = {
        cities: cities,
        loading: loading,
        error: error,
        handleAddCity: handleAddCity,
        handleEditCity: handleEditCity,
        handleRemoveCity: handleRemoveCity,
        handleLoadCity: handleLoadCity,
        startLoading: startLoading,
    };
    return (
        <CitiesContext.Provider value={valueObj}>
            {children}
        </CitiesContext.Provider>
    );
};
const useCities = function () {
    const context = useContext(CitiesContext);
    if (context == undefined)
        throw new Error("trying to access context outside the provider");
    return context;
};

export { CitiesProvider, useCities };
