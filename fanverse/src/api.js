const BACKEND_URL = 'http://127.0.0.1:4000/users'

export async function register(username, psw,email ) {
    const res = await fetch(`${BACKEND_URL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, psw,email })
    })
    //console.log(res)

    const data = await res.json()
    //console.log(data.error);

    if (data.error) {
        return data
    }
    return data
}

export async function login( email, psw) {
    const res = await fetch(`${BACKEND_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, psw }) 
    })
    //console.log(res)

    const data = await res.json()
    //console.log(data.error);

    if (data.error) {
        return data
    }
    return data
}