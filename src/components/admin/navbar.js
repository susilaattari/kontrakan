import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export class Navbar extends Component {
  render() {
    return (
      <header id="header" className="header">
        <div className="top-left">
          <div className="navbar-header">
            <Link className="navbar-brand" to={'/'}>MENU AWAL</Link>
            <Link id="menuToggle" className="menutoggle"><i className="fa fa-bars" /></Link>
          </div>
        </div>
      </header>
    )
  }
}

export default Navbar