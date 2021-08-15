import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import {
  faGithub,
  faLinkedinIn,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

library.add(fab, faGithub, faLinkedinIn, faInstagram);

export const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <img
            src="/unalome.png"
            alt=""
            width="24"
            height="24"
            className="d-inline-block align-text-top mr-2"
          />
          <span className="pl-3">Ushir (Rishi) Raval</span>
        </a>

        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href="https://github.com/urishiraval">
              <FontAwesomeIcon icon={["fab", "github"]} />
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="https://www.linkedin.com/in/unraval/">
              <FontAwesomeIcon icon={["fab", "linkedin-in"]} />
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="https://www.instagram.com/rishi_raval7/">
              <FontAwesomeIcon icon={["fab", "instagram"]} />
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};
