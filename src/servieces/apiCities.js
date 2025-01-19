const baseUrl = `http://localhost:3000`;

export async function getCities() {
    const response = await fetch(`${baseUrl}/cities`, {
        method: "GET",
    });
    const data = await response.json();
    return data;
}

export async function getCity(id) {
    const response = await fetch(`${baseUrl}/cities/${id}`, {
        method: "GET",
    });
    const data = await response.json();
    return data;
}

export async function createCity(newCity) {
    const response = await fetch(`${baseUrl}/cities`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCity),
    });
    const data = await response.json();
    return data;
}

export async function updateCity(id, updateCity) {
    const response = await fetch(`${baseUrl}/cities/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateCity),
    });
    const data = await response.json();
    return data;
}

export async function deleteCity(id) {
    const response = await fetch(`${baseUrl}/cities/${id}`, {
        method: "DELETE",
    });
    const data = await response.json();
    return data;
}
