import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {Link, useNavigate} from 'react-router-dom'



export default function Register() {

    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [psw, setPsw] = useState('')
    const [psw2, setPsw2]=useState('')

    return (
      <div className="container" style={{maxWidth: 520, marginTop: 300}}>

        <div className="content-wrapper container">
          <div className="row g-4 justify-content-center">

            <div className="col-12 col-lg-6 d-flex justify-content-center">
              <div className="custom-card text-center">
                <div className="logo">
                  <p>logó</p>
                  <h1>
                    fanverse <br />
                    <span>central</span>
                  </h1>
                </div>
                <button className="primary-btn">Login</button>
              </div>
            </div>

            <div className="col-12 col-lg-6 d-flex justify-content-center">
              <div className="custom-card">
                <Input label='E-mail' type='email' value={email} setValue={setEmail} placeholder='example@example.com'/>
                <Input label='Username' type='text' value={username} setValue={setUsername} placeholder='John Doe'/>
                <Input label='Password' type='password' value={psw} setValue={setPsw} placeholder='******'/>
                <Input label='Password again' type='password' value={psw2} setValue={setPsw2} placeholder='******'/>
                <div className="text-center mt-3">
                  <Gomb szin = 'btn btn-dark px-4' onClick={onReg} text='Regisztráció'/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}
