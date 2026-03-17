import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, } from 'react-router-dom'

import Navbar from "../components/NavBar";
import Button from "../components/Button";
import { logout, whoami } from "../api";
import Input from "../components/Input"
import Images from "../components/Images";

import pfp from "../photos/pfp.jpg"

export default function Profile() {
    const [user, setUser] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        async function loadUser() {
            const data = await whoami();
            setUser(data);
        }
        loadUser();
    }, []);

    const onLogout = async () => {
        await logout();
        navigate("/login");
    };

    return (
        <div className="" style={{ backgroundColor: '#452458', minHeight: "100vh" }}>
            <div>
                <Navbar user={user} onLogout={onLogout} />
            </div>
            <div className="container d-flex justify-content-center align-items-center" style={{ backgroundColor: '#452458', minHeight: "80vh" }}>
                <div className="text-center" style={{ width: 450 }} >
                    <div /*className="d-flex justify-content-center align-items-center"*/ style={{ position: "relative", display: "inline-block" }}>
                        <Images Class={"image rounded-circle mx-auto d-block"} src={pfp} altszov="Profile Picture" height={200} />
                        <Button szin="btn btn-danger rounded-circle" style={{
                            position: "absolute",
                            bottom: 10,
                            right: 10,
                            width: 40,
                            height: 40
                        }} text='✏️' />
                    </div>
                    <Input label='Username szerkesztése' type='text' value="" setValue="" placeholder='John Doe' />
                    <Button text="Mentés" szin="btn btn-danger px-4" />
                </div>
            </div>
        </div>

    )
}