import React from 'react'
import logo from '../../assets/images/logo.png'
import './navbar.css'

function NavBar() {
    return (
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
        <a class="nav-link" href="#">Home</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Discover</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Contact Us</a>
      </li>
    </ul>
  </div>
            </nav>
        </div>
    )
}

export default NavBar;