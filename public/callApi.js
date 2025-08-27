export const postJson = async (data, endpoint) => {
    return await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
}

export const getJson = async (endpoint) => {
    const response = await fetch(endpoint, {
        method: "GET",
        headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) {
        throw new Error(`Server response is not OK: ${response.status}`)
    }
    return await response.json();
}