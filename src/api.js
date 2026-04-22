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

export async function getGames(){
    const res = await fetch(`${BACKEND_URL}/admin/games`,{
        method: 'GET',
        credentials: 'include'
    })

    if(!res.ok){
        const data = await res.json()
        return {error:data?.error}
    }
    return await res.json()
}

export async function getOneGame(game_id){
    const res = await fetch(`${MAIN_BACKEND_URL}/oneGame/${game_id}`,{
        method:'GET',
        credentials: 'include'
    })
    if(!res.ok){
        const data = await res.json()
        return {error:data?.error}
    }
    return await res.json()
}

export async function editUser(user_id, username, email, role) {
    try {
        const res = await fetch(`${BACKEND_URL}/admin/edit/${user_id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, role }),
            credentials: 'include'
        });

        // 1. Ha a válasz üres (pl. DELETE-nél vagy hiba esetén), ne haljon meg
        const text = await res.text(); 
        const data = text ? JSON.parse(text) : {};

        // 2. Csak akkor menjünk tovább, ha a státusz 200-299 közötti
        if (!res.ok) {
            return { error: data.error || `Szerver hiba: ${res.status}` };
        }

        return data;
    } catch (err) {
        return { error: "Hálózati hiba történt!" };
    }
}
export async function deleteUser(user_id) {
    const res = await fetch(`${BACKEND_URL}/admin/delete/${user_id}`,{
        method: 'DELETE',
        credentials: 'include'
    })

    if (!res.ok) {
        const data = await res.json()
        return { error: data?.error }
    }

    return await res.json()
}

export async function editGame(game_id, title, description, creator_name) {
    try {
        const res = await fetch(`${BACKEND_URL}/admin/editGame/${game_id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({  title, description, creator_name }),
            credentials: 'include'
        });

        // 1. Ha a válasz üres (pl. DELETE-nél vagy hiba esetén), ne haljon meg
        const text = await res.text(); 
        const data = text ? JSON.parse(text) : {};

        // 2. Csak akkor menjünk tovább, ha a státusz 200-299 közötti
        if (!res.ok) {
            return { error: data.error || `Szerver hiba: ${res.status}` };
        }

        return data;
    } catch (err) {
        return { error: "Hálózati hiba történt!" };
    }
}

export async function deleteGame(game_id) {
    const res = await fetch(`${BACKEND_URL}/admin/deleteGame/${game_id}`,{
        method: 'DELETE',
        credentials: 'include'
    })

    if (!res.ok) {
        const data = await res.json()
        return { error: data?.error }
    }   

    return await res.json()
}

export async function editUsername(username) {
    const res = await fetch(`${BACKEND_URL}/editUsername`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username }), // csak a nevet küldjük
        credentials: 'include'
    });

    if (!res.ok) {
        try {
            const data = await res.json();
            return { error: data?.error };
        } catch (e) {
            return { error: `Szerver hiba: ${res.status}` };
        }
    }

    return await res.json();
}

export async function editProfilePicture(user_id, formData) {
    const res = await fetch(`${BACKEND_URL}/uploadpfp/${user_id}`, {
        method: 'POST',
        body: formData, // FormData esetén NEM kell Content-Type header!
        credentials: 'include'
    });

    if (!res.ok) {
        try {
            const data = await res.json();
            return { error: data?.error };
        } catch (e) {
            return { error: "Hiba a feltöltés során." };
        }
    }   

    return await res.json();
}

export async function searchGames(title) {
    try {
        const res = await fetch(`${MAIN_BACKEND_URL}/search/${encodeURIComponent(title)}`, {
            method: 'GET',
            credentials: 'include', // ha session cookie kell
        });

        const data = await res.json().catch(() => ({}));

        if (!res.ok) {
            return { error: data?.error || "Search failed" };
        }

        return data; // tömb a találatokról
    } catch (err) {
        console.error("Search error:", err);
        return { error: "Network error" };
    }
}

// LIKE TOGGLE
export async function toggleLike(game_id) {
    const res = await fetch(`${MAIN_BACKEND_URL}/like/${game_id}`, {
        method: 'POST',
        credentials: 'include'
    });

    const data = await res.json();
    return data;
}

// LIKE COUNT
export async function getLikes(game_id) {
    const res = await fetch(`${MAIN_BACKEND_URL}/likes/${game_id}`);
    const data = await res.json();
    return data;
}

// USER LIKED?
export async function isLiked(game_id) {
    const res = await fetch(`${MAIN_BACKEND_URL}/isLiked/${game_id}`, {
        credentials: 'include'
    });

    const data = await res.json();
    return data;
}