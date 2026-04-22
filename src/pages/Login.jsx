import { useState } from "react";
import { Link, useNavigate, } from 'react-router-dom'
import "../cssfolder/login.css"

import Input from "../components/Input"
import Button from "../components/Button";
import Images from "../components/Images";

import { login } from "../api";

import logo from "../photos/logo.png"

export default function Login() {

    const [email, setEmail] = useState('')
    const [psw, setPsw] = useState('')
    const navigate = useNavigate();

    const [uzenet, setUzenet] = useState('')

    async function onLogin() {

        setUzenet('')

        if (!email || !psw) {
            return alert('Minden mezőt tölts ki!')
        }

        try {
            const data = await login(email, psw)
            if (data.error) {
                return alert(data.error)
            }
            setUzenet(data.message)
            setTimeout(()=>navigate('/'),600)

        } catch (err) {
            alert('Nem sikerült kapcsolódni a backendhez.')
        }
    }

    return (
        <>
            <div className="full">
                <div className="content-wrapper container">
                    <div className="phone">
                        <div className="row  d-flex justify-content-around">
                            {/* bejelentkezés*/}
                            <div className="col-12 col-md-5 rounded-5 p-3 phone2" style={{ backgroundColor: '#452458' }}>
                                <div className="custom-card justify-content-center align-items-center mt-5 loginposition">
                                    <div className="posi">
                                        <div className="pd">
                                            <Input label='E-mail' type='email' value={email} setValue={setEmail} placeholder='example@example.com' />
                                        </div>
                                        <Input label='Password' type='password' value={psw} setValue={setPsw} placeholder='******' />
                                    </div>
                                    <div className="text-center mt-3">
                                        <Button szin='btn btn-light px-4 loginButton' onClick={onLogin} text='Bejelentkezés' />
                                    </div>
                                </div>
                            </div>
                            {/* regisztráció */}
                            <div className="col-12 col-md-5 justify-content-center rounded-5 p-3 regLogin" style={{ backgroundColor: '#452458' }}>
                                <div className="custom-card text-center justify-content-center align-items-center">
                                    <div className="">
                                        <Images Class={"image"} src={logo} altszov="Freddy logo"   />
                                        <h1>
                                            <span style={{ color: 'white' }}>Fanverse</span>
                                            <br />
                                            <span style={{ color: '#FF305D' }}>Central</span>
                                        </h1>
                                    </div>
                                    <div className="text-center mt-3">
                                        <Button onClick={() => navigate('/Register')} szin='btn btn-light px-4 mt-4 regButton' text='Regisztráció' />
                                    </div>

                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}