import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import useOwnerStore from '../store'
import '../styles/Login.css'
import { addOwner, getAllOwners } from '../utils/owner.handler'

export class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      username: '',
      password: '',
      users: useOwnerStore.getState().users
    }
  }

  componentDidMount() {
    document.title = 'Register';
    getAllOwners();
    this.setState({ users: useOwnerStore.getState().users });
    console.log(this.state.users);
  }

  handleRegister = (event) => {
    event.preventDefault();
    const users = this.state.users;
    if (users.length === 0) {
      getAllOwners();
      console.log('get all owners');
    }
    users.push({ fullname: this.state.username, address: '-', phone: '-', email: this.state.email, username: this.state.username, password: this.state.password });
    useOwnerStore.setState({ users });
    addOwner(this.state.users);
    Swal.fire('Success!', 'Register Success! Redirect in 3 seconds', 'success');
    this.setState({ users: useOwnerStore.getState().users });
    console.log(this.state.users);
    setTimeout(() => {
      window.location.href = '/login';
    }, 3000);
  }

  render() {
    return (
      <div className="testbox">
        <div>
          <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,300,300italic,400italic,600" rel="stylesheet" type="text/css" />
          <link href="//netdna.bootstrapcdn.com/font-awesome/3.1.1/css/font-awesome.css" rel="stylesheet" />
        </div>
        <h1>Registration</h1>
        <form >
          <hr style={{ marginBottom: '50px' }} />
          <label id="icon" htmlFor="name"><i className="icon-envelope " /></label>
          <input type="text" name="email" id="email" placeholder="Email" value={this.state.email} onChange={(e) => this.setState({ email: e.target.value })} required />
          <label id="icon" htmlFor="name"><i className="icon-user" /></label>
          <input type="text" name="username" id="username" placeholder="Name" value={this.state.username} onChange={(e) => this.setState({ username: e.target.value })} required />
          <label id="icon" htmlFor="name"><i className="icon-shield" /></label>
          <input type="password" name="password" id="password" placeholder="Password" value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })} required />
          <p>Already have an account? <Link to="/login">Login</Link>.</p>
          <Link href="#" onClick={this.handleRegister} className="button" style={{ textAlign: 'center' }}>Register</Link>
        </form>
      </div>
    )
  }
}

export default Register