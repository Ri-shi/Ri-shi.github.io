import React from "react";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <img
            src="/unalome.png"
            width="24"
            height="24"
            className="d-inline-block align-text-top mr-2"
          />
          <span className="pl-3">Ushir (Rishi) Raval</span>
        </a>

        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href="https://github.com/urishiraval">
              <i className="fab fa-github"></i>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="https://www.linkedin.com/in/unraval/">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="https://www.instagram.com/rishi_raval7/">
              <i className="fab fa-instagram"></i>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};
