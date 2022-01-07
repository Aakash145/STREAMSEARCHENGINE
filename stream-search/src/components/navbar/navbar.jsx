import React from 'react'
import logo from '../../assets/images/logo.png'
import './navbar.css'
import Home from '../home/home'
import Discover from '../discover/discover'
import Contact from '../contact/contact'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';

function NavBar() {
    return (
      <Router>
        <div className="row">
             <nav class="navbar navbar-expand-lg">
             <a class="navbar-brand" href="#">
             <img src={logo} width="45" height="45" class="d-inline-block align-top" alt="" />
             <span>Stream <small>Search</small></span>
            </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavDropdown">
    <ul class="navbar-nav ml-auto">
      <li class="nav-item active">
      <Link to="/" class="nav-link">Home</Link>
      </li>
      <li class="nav-item">
      <Link to="/discover" class="nav-link">Discover</Link>
      </li>
      <li class="nav-item">
      <Link to="/contact" class="nav-link">Contact Us</Link>
      </li>
    </ul>
  </div>
            </nav>
            <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/discover" element={<Discover />} />

          <Route path="/contact" element={<Contact />} />
        </Routes>
        </div>
        </Router>
    )
}

export default NavBar;