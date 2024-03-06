export const SERVER_URL = 'http://localhost:3000'

export async function serverAddClient(obj) {
    let response = await fetch(SERVER_URL + '/api/clients', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj),
    })

    let data = await response.json()
    return data
}

export async function serverCreateClient(id, obj) {
    let response = await fetch(SERVER_URL + `/api/clients/` + id, {
        method: "PATCH",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj),
    })

    let data = await response.json()
    return data
}

export async function serverGetClient() {
    let response = await fetch(SERVER_URL + '/api/clients', {
        method: "GET",
        headers: { 'Content-Type': 'application/json' }
    })

    let data = await response.json()
    return data
}

export async function serverDeleteClient(id) {
    let response = await fetch(SERVER_URL + '/api/clients/' + id, {
        method: "DELETE",
    })

    let data = await response.json()
    return data
}
