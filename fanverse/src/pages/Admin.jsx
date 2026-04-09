    import { useState, useEffect } from "react";
    import { Navigate } from "react-router-dom";

    import { useAuth } from "../context/AuthContext";

    import Table from "../components/Table";
    import Navbar from "../components/NavBar";
    import Button from "../components/Button";

    import "../cssfolder/admin.css"

    import { getAllUsers, getAllGames, editUser, deleteUser, editGame, deleteGame } from "../api";

    export default function Admin() {
        const { user, loading, onLogout } = useAuth()

        const [allUsers, setAllUser] = useState([])
        const [errorAllUsers, setErrorAllUsers] = useState('')
        const [allGames, setAllGames] = useState([])
        const [errorAllGames, setErrorAllGames] = useState('')

        const [selectedUser, setSelectedUser] = useState(null)
        const [selectedGame, setSelectedGame] = useState(null)
        const [showModal, setShowModal] = useState(false)

        const [username, setUsername] = useState('')
        const [email, setEmail] = useState('')
        const [role, setRole] = useState('')



        const [title, setTitle] = useState('')
        const [Description, setDescription] = useState('')
        const [Banner, setBanner] = useState('')
        const [Creator, setCreator] = useState('')

        useEffect(() => {
            async function loadUsers() {
                if (user?.role !== 'admin') return
                const data = await getAllUsers()

                if (!data.error) {
                    return setAllUser(data)
                }

                return setErrorAllUsers(data.error)

            }
            loadUsers()
        }, [user])

        useEffect(() => {
            async function loadGames() {
                if (user?.role !== 'admin') return
                const data = await getAllGames()

                if (!data.error) {
                    setAllGames(data)
                } else {
                    setErrorAllGames(data.error)
                    console.error("Hiba a játékok lekérésekor:", data.error)
                }
            }
            loadGames()
        }, [user])

        if (loading) {
            return (
                <div className="container py-5">
                    <div className="spinner-border text-danger"></div>
                </div>
            )
        }

        if (!user) {
            return <Navigate to='/' />
        }

        if (user.role !== 'admin') {
            return <Navigate to='/' />
        }

        function handleEdit(user) {
            setSelectedUser(user)
            setShowModal(true)
        }

        function handleEditGame(game) {
            setSelectedUser(null); // Ez takarítja el a profil modalt a képből
            setSelectedGame(game);
            // ... a többi beállítás (setTitle, stb.)
            setShowModal(true);
        }

        async function handleDeleteUser(user) {
            setErrorAllUsers('')
            setSelectedUser(user)

            const confirmDelete = window.confirm(`Biztosan törölni akarod a ${user.username} felhasználót?`)

            if (!confirmDelete) {
                return
            }

            const data = await deleteUser(user.user_id)

            if (data.error) {
                setErrorAllUsers(data.error)
                return alert(errorAllUsers)
            }

            return alert('Sikeres módosítás')

        }

     async function handleDeleteGame(game) {
    const confirmDelete = window.confirm(`Biztosan törölni akarod a ${game.title} játékot?`);
    if (!confirmDelete) return;

    const data = await deleteGame(game.game_id);

    if (data.error) {
        // Közvetlenül a kapott hibaüzenetet írjuk ki, nem a state-et!
        alert("Hiba a törlés során: " + data.error);
        return;
    }

    alert('A játék sikeresen törölve!');

    // SIKER ESETÉN: Frissítjük a listát azonnal (eltüntetjük a töröltet)
    setAllGames(prevGames => prevGames.filter(g => g.game_id !== game.game_id));
}

        async function HandleEditUser(user_id) {
            setErrorAllUsers('')

            const data = await editUser(user_id, username, email, role)

            if (data.error) {
                setErrorAllUsers(data.error)
                return alert(errorAllUsers)
            }

            return alert('Sikeres módosítás')
        }

    function handleEditGame(game) {
            setSelectedUser(null); // Felhasználó törlése, hogy ne a profil modal jöjjön fel
            setSelectedGame(game);
            
            // Fontos: A játék inputok frissítése!
            setTitle(game.title);
            setDescription(game.description);
            setCreator(game.creator_name);
            
            setShowModal(true);
        }

        console.log(user);
        console.log(user?.role);

    async function HandleEditGame(game_id) {
        setErrorAllGames('');

        // Itt hívjuk meg az api.js-ben lévő függvényt
        const data = await editGame(game_id, title, Description, Creator);

        if (data.error) {
            setErrorAllGames(data.error);
            return alert("Hiba: " + data.error);
        }

        alert('Sikeres módosítás!');
        setShowModal(false); // Modal bezárása sikeres mentés után
        
        // Opcionális: adatok újratöltése, hogy látszódjon a változás
        const freshGames = await getAllGames();
        if (!freshGames.error) setAllGames(freshGames);
    }

        return (
            <>
                <Navbar user={user} onLogout={onLogout} />
                <div className="fill" style={{ backgroundColor: '#452458', }}>

                    <div className="container py-5" >

                        <h1 className="text-white">Admin panel</h1>

                        <Table allUsers={allUsers} allGames={allGames} onEditUser={handleEdit} onEditGame={handleEditGame} onDeleteUser={handleDeleteUser}  onDeleteGame={handleDeleteGame}/>

                        {showModal && selectedUser && (
                            <div className='modal d-block' tabIndex='-1'>
                                <div className="modal-dialog">
                                    <div className="modal-content p-3">
                                        <h5>Szerkesztés</h5>

                                        {/* EMAIL MEZŐ */}
                                        <label className="form-label text-black fw-bold">Email</label>
                                        <input
                                            type="email"
                                            className='form-control'
                                            defaultValue={selectedUser.email} // Itt email legyen!
                                            placeholder='example@example.com'
                                            onChange={(e) => setEmail(e.target.value)} // setEmail-t hívjuk!
                                        />

                                        {/* USERNAME MEZŐ */}
                                        <label className="form-label text-black fw-bold">Username</label>
                                        <input
                                            type="text"
                                            className='form-control'
                                            defaultValue={selectedUser.username} // Itt username legyen!
                                            placeholder='John Doe'
                                            onChange={(e) => setUsername(e.target.value)} // setUsername-et hívjuk!
                                        />

                                        {/* ROLE MEZŐ */}
                                        <label className="form-label text-black fw-bold">Role: </label>
                                        <input
                                            type="text"
                                            className='form-control'
                                            defaultValue={selectedUser.role}
                                            placeholder='admin/user'
                                            onChange={(e) => setRole(e.target.value)}
                                        />

                                        <div className="d-flex justify-content-between mt-3">
                                            <button type='button' className='btn btn-primary' onClick={() => HandleEditUser(selectedUser.user_id)}>Módosít</button>
                                            <button type='button' className='btn btn-secondary' onClick={() => setShowModal(false)}>Bezárás</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {showModal && selectedGame && (
                            <div className='modal d-block' tabIndex='-1'>
                                <div className="modal-dialog">
                                    <div className="modal-content p-3">
                                        <h5>Szerkesztés</h5>

                                        {/* EMAIL MEZŐ */}
                                        <label className="form-label text-black fw-bold">Title</label>
                                        <input
                                            type="email"
                                            className='form-control'
                                            defaultValue={selectedGame.title} // Itt email legyen!
                                            placeholder='five Night xyz'
                                            onChange={(e) => setTitle(e.target.value)} // setEmail-t hívjuk!
                                        />

                                        {/* USERNAME MEZŐ */}
                                        <label className="form-label text-black fw-bold">Description</label>
                                        <input
                                            type="text"
                                            className='form-control'
                                            defaultValue={selectedGame.description} 
                                            placeholder='"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."'
                                            onChange={(e) => setDescription(e.target.value)} 
                                        />

                                        {/* ROLE MEZŐ */}
                                        <label className="form-label text-black fw-bold">Creator</label>
                                        <input
                                            type="text"
                                            className='form-control'
                                            defaultValue={selectedGame.creator}
                                            placeholder='John Doe'
                                            onChange={(e) => setCreator(e.target.value)}
                                        />

                                        <div className="d-flex justify-content-between mt-3">
                                            <button type='button' className='btn btn-primary' onClick={() => HandleEditGame(selectedGame.game_id)}>Módosít</button>
                                            <button type='button' className='btn btn-secondary' onClick={() => setShowModal(false)}>Bezárás</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </>
        )


    }