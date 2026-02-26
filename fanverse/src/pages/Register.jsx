import { useState } from "react";
import { Link, useNavigate, } from 'react-router-dom'
import "../cssfolder/register.css"

import Input from "../components/Input"
import Button from "../components/Button";
import Images from "../components/Images";

import { register } from "../api";

import logo from "../photos/logo.png"

export default function Register() {

  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [psw, setPsw] = useState('')
  const [psw2, setPsw2] = useState('')

  const navigate = useNavigate();
  const [uzenet, setUzenet] = useState('')

  async function onReg() {

    setUzenet('')

    if (!email || !username || !psw || !psw2) {
      return alert('Minden mezőt tölts ki!')
    }

    if (psw !== psw2) {
      return alert('A jelszavak nem egyeznek meg!')
    }

    try {
      const data = await register(username, psw, email)
      if (data.error) {
        alert(data.error)
      }
      setUzenet(data.message)

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
              {/* bejelentkezés */}
              <div className="col-12 col-md-5 justify-content-center rounded-5 p-3 regLogin" style={{ backgroundColor: '#452458' }}>
                <div className="custom-card text-center justify-content-center align-items-center">
                  <div className="logo">
                    <Images src={logo} altszov="Freddy logo" style={{}} />
                    <h1>
                      <span style={{ color: 'white' }}>Fanverse</span>
                      <br />
                      <span style={{ color: '#FF305D' }}>Central</span>
                    </h1>
                  </div>
                  <div className="text-center mt-3">
                    <Button szin='btn btn-light px-4 mt-4 loginButton' onClick={() => navigate('/Login')} text='Bejelentkezés' />
                  </div>
                </div>
              </div>

              {/* regisztráció*/}

              <div className="col-12 col-md-5 rounded-5 p-3 phone2" style={{ backgroundColor: '#452458' }}>
                <div className="custom-card justify-content-center align-items-center">
                  <Input label='E-mail' type='email' value={email} setValue={setEmail} placeholder='example@example.com' />
                  <Input label='Username' type='text' value={username} setValue={setUsername} placeholder='John Doe' />
                  <Input label='Password' type='password' value={psw} setValue={setPsw} placeholder='******' />
                  <Input label='Password again' type='password' value={psw2} setValue={setPsw2} placeholder='******' />
                  <div className="text-center mt-3">
                    <Button onClick={onReg} szin='btn btn-light px-4 mt-3' text='Regisztráció' />
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
