const BACKEND_URL = '/users'
const MAIN_BACKEND_URL = '/main'

export async function register(username, psw,email ) {
    const res = await fetch(`${BACKEND_URL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, psw,email }),
        
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
        body: JSON.stringify({ email, psw }), 
        credentials: 'include'
       
    })
    //console.log(res)

    const data = await res.json()
    //console.log(data.error);

    if (data.error) {
        return data
    }
    return data
}

export async function whoami(){
    const res = await fetch(`${BACKEND_URL}/whoami`,{
        method:'GET',
        credentials:'include'
    })
    if(!res.ok){
        const data = await res.json()
        return {error:data?.error}
    }
    return await res.json()
}

export async function logout(){
    const res = await fetch(`${BACKEND_URL}/logout`,{
        method : 'POST',
        credentials :'include'
    })
    if(!res.ok){
        const data = await res.json()
        return {error:data?.error}
    }
    return await res.json()
}

export async function getAllGames() {
    try {
        const res = await fetch(`${MAIN_BACKEND_URL}/everything`, {
            method: 'GET',
            credentials: 'include', // ha session cookie kell
        });

        const data = await res.json().catch(() => ({}));

        if (!res.ok) {
            // ha a fetch 404, 500 stb.
            return { error: data?.error || "games fetch failed" };
        }

        return data; // sikeres JSON
    } catch (err) {
        console.error("Network or server error:", err);
        return { error: "Network error or server unavailable" };
    }
}

export async function getAllUsers(){
    const res = await fetch(`${BACKEND_URL}/admin/users`,{
        method: 'GET',
        credentials: 'include'
    })

    if(!res.ok){
        const data = await res.json()
        return {error:data?.error}
    }
    return await res.json()
}