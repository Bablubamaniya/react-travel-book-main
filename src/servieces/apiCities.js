// read
//create
// update
// delete


const baseUrl = `http://localhost:3000`;

export async function getCities() {
    const resorse = await fetch(`${baseUrl}/cities`,{
        method: 'GET',
    });
    const data = await resorse.json();
    return data;
}

export async function getCity(id) {
    const resorse = await fetch(`${baseUrl}/cities/${id}`,{
        method: 'GET',
    });
    const data = await resorse.json();
    return data; 
}

export async function createCity(newCity) {
    const resorse = await fetch(`${baseUrl}/cities`,{
        method: 'POST',
        headers: {'Content-Type':"application/json"},
        body: newCity,
    });
    const data = await resorse.json();
    return data;
}

export async function updateCity(updateCity,id) {
    const resorse = await fetch(`${baseUrl}/cities/${id}`,{
        method: 'PATCH',
        headers: {'Content-Type':"application/json"},
        body: updateCity,
    });
    const data = await resorse.json();
    return data;
}

export async function deleteCity(id) {
    const resorse = await fetch(`${baseUrl}/cities/${id}`,{
        method: 'DELETE',
    });
    const data = await resorse.json();
    return data;
}