const BACKEND_URL = '/users'

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