import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import '../styles/Navbar.css'

export class Navbar extends Component {
  constructor(props){
    super(props)
    this.state = {
      isLoggedIn: false
    }
  }
  componentDidMount(){
    this.setState({ isLoggedIn: this.checkCookie('user')})
  }

  checkCookie(cookieName) {
    const match = document.cookie.match(new RegExp('(^| )' + cookieName + '=([^;]+)'));
    if (match) {
      return true;
    } else {
      return false;
    }
  }
  render() {
    return (
      <ul className='navdd'>
        <li className='navit'><Link className="active" to="/">Home</Link></li>
        <li className="dd" style={{float: 'right'}}>
          <a href="javascript:void(0)" className="dropbtn">Action</a>
          <div className="dd-content">
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/logout">Logout</Link>
            <Link hidden={this.props.isLoggedIn} to="/login">Login</Link>
            <Link hidden={this.props.isLoggedIn} to="/register">Register</Link>
          </div>
        </li>
      </ul>
    )
  }
}

export default Navbar