import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import Table from "../components/Table";
import Navbar from "../components/NavBar";
import Button from "../components/Button";

import "../cssfolder/admin.css"

import { getAllUsers , getAllGames } from "../api";

export default function Admin() {
    const { user, loading, onLogout } = useAuth()

    const [allUsers, setAllUser] = useState([])
    const [errorAllUsers, setErrorAllUsers] = useState('')
    const [allGames, setAllGames] = useState([])
    const [errorAllGames, setErrorAllGames] = useState('')



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

    console.log(user);
    console.log(user?.role);

    return (
        <>
            <Navbar user={user} onLogout={onLogout} />
            <div className="fill" style={{ backgroundColor: '#452458', }}>

                <div className="container py-5" >


                    <h1 className="text-white">Admin panel</h1>



                    <Table allUsers={allUsers} allGames={allGames} />
                </div>
            </div>
        </>
    )


}