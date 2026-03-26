import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import Table from "../components/Table";
import Navbar from "../components/NavBar";
import Button from "../components/Button";


import { getAllUsers } from "../api";

export default function Admin() {
    const { user, loading, onLogout } = useAuth()

    const [allUsers, setAllUser] = useState([])
    const [errorAllUsers, setErrorAllUsers] = useState('')

   

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
    return (
        <div className="container py-5">
            <Navbar user={user} onLogout={onLogout} />

            <h1>Admin panel</h1>

            <Button szin='btn btn-sm btn-warning' text='Profilok' onClick={() => console.log('')} />
            <Button szin='btn btn-sm btn-dark' text='Játékok' onClick={() => console.log('')} />

            <Table allUsers={allUsers} />
        </div>
    )
}