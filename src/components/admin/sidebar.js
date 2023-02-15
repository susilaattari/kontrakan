import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      path: window.location.pathname.split('/')[1]
    }
  }
  deleteCookie(cookieName) {
    var today = new Date();
    document.cookie = cookieName + "=; expires=" + today.toGMTString();
  }
  render() {
    return (
      <aside id="left-panel" className="left-panel">
        <nav className="navbar navbar-expand-sm navbar-default">
          <div id="main-menu" className="main-menu collapse navbar-collapse">
            <ul className="nav navbar-nav">
              <li className="menu-title">Main Menu</li>
              <li className={this.state.path === 'dashboard' ? 'active' : ''}>
                <Link to={'/dashboard'}><i className="menu-icon fa fa-laptop" />Dashboard </Link>
              </li>
              <li className={this.state.path === 'dashboard-kosan' ? 'active' : ''}>
                <Link to={'/dashboard-kosan'}><i className="menu-icon fa fa-home" />Kosan</Link>
              </li>
              <li className={this.state.path === 'logout' ? 'active' : ''}>
                <a onClick={() => this.deleteCookie('user')} href={'/'}><i className="menu-icon fa fa-sign-out" />Logout </a>
              </li>
            </ul>
          </div>
        </nav>
      </aside>
    )
  }
}

export default Sidebar