import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2';
import useOwnerStore from '../store';
import '../styles/Login.css'

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      users: [],
    }
  }
  componentDidMount() {
    document.title = 'Login'
    this.fetchUsers()
  }
  setCookie(cookieName, cookieValue, nHours) {
    let date = new Date();
    date.setTime(date.getTime() + (nHours * 60 * 60 * 1000));
    document.cookie = cookieName + " = " + cookieValue + "; expires = " + date.toGMTString();
  }

  fetchUsers = () => {
    fetch('https://api.jsonbin.io/v3/b/63a8472901a72b59f238ef90', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-Master-Key': '$2b$10$vWIkDxaKY.PAOwcpb/jFH.pyoWktZhboUgiSrlhXoQiylw33vX2MS'
    }
  })
    .then(response => response.json())
    .then((data) => {
      this.setState({ users: data.record.users });
      console.log(this.state.users)
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { email, password } = this.state
    const data = {
      email: email,
      password: password
    }
    const login = this.state.users.filter(user => user.email === data.email && user.password === data.password)
    if (login.length > 0) {
      Swal.fire('Success!', 'Login Success! Redirect in 3 seconds', 'success')
      this.setState({ email: '', password: '' })
      this.setCookie('user', JSON.stringify({loggedIn: true, email: login[0].email, username: login[0].username}), 1)
      setTimeout(() => {
        window.location.href = '/dashboard'
      }, 3000)
    } else {
      Swal.fire('Oops...', 'Email or Password is wrong!', 'error')
    }
  }
  render() {
    return (
      <div className="testbox">
        <div>
          <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,300,300italic,400italic,600" rel="stylesheet" type="text/css" />
          <link href="//netdna.bootstrapcdn.com/font-awesome/3.1.1/css/font-awesome.css" rel="stylesheet" />
        </div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <hr style={{ marginBottom: '50px', marginTop: '50px' }} />
          <label id="icon" htmlFor="name"><i className="icon-envelope " /></label>
          <input type="text" name="name" id="name" placeholder="Email" required value={this.state.email} onChange={e => this.setState({ email: e.target.value })} />
          <label id="icon" htmlFor="name"><i className="icon-user" /></label>
          <input type="password" name="name" id="name" placeholder="Password" required value={this.state.password} onChange={e => this.setState({ password: e.target.value })} />
          <p>Don't have an account? <Link to="/register">Register</Link>.</p>
          {/* <Link href="#" type='submit' className="button" style={{ textAlign: 'center' }}>Login</Link> */}
          <button className='button' type="submit">Login</button>
        </form>
      </div>
    )
  }
};

export default Login;