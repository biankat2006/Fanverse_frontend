import React from "react";
import "./AuthPage.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function AuthPage() {
  return (
    <div className="auth-container">
      <div className="overlay"></div>

      <div className="content-wrapper container">
        <div className="row g-4 justify-content-center">

          <div className="col-12 col-lg-6 d-flex justify-content-center">
            <div className="custom-card text-center">
              <div className="logo">
                <p>logo</p>
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
              <input type="email" placeholder="Email" />
              <input type="text" placeholder="Username" />
              <input type="password" placeholder="Password" />
              <button className="primary-btn">Register</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
