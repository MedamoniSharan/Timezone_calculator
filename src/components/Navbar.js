import React from "react";
import { Link, useLocation } from "react-router-dom";
import ImageSection from "./ImageSection";
import { MdMoreTime } from "react-icons/md";
import "../components/Navbar.css";

function Navbar() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div>
      <header>
        <nav className={`navbar navbar-expand-lg navbar-light fixed-top ${isHome ? 'home-navbar' : 'other-navbar'} mask-custom shadow-0`}>
          <div className="container">
            <div className="navbar-brand-container d-flex align-items-center"> {/* Container for Time Zone brand and logo */}
              <MdMoreTime size={40} style={{ color: '#5e9693' }} /> {/* Time logo */}
              <a className="navbar-brand" href="#!">
                <span style={{ fontSize: '50px', color: '#5e9693' }}>Time</span>
                <span style={{ fontSize: '37px', color: 'white' }}>Zone</span>
              </a>
            </div>
            <button className="navbar-toggler" type="button" data-mdb-toggle="collapse"
              data-mdb-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
              aria-label="Toggle navigation">
              <i className="fas fa-bars"></i>
            </button>
            <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link to="/" className="nav-link ">Home</Link>
                </li>
                <li className="nav-item">
                  <Link to="/calculate" className="nav-link">Time-Difference</Link>
                </li>
                <li className="nav-item">
                  <Link to="/timezones" className="nav-link">timezones</Link>
                </li>
                <li className="nav-item">
                  <Link to="#" className="nav-link">About</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <div className="image-section-wrapper">
        {isHome && <ImageSection />}
      </div>
    </div>
  );
}

export default Navbar;
