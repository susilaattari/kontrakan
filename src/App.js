import React, { Component } from "react";
import "./App.css";
import Homestay from "./components/homestay";
import GoogleMapReact from "google-map-react";
import Marker from "./components/marker";
// import { getAllOwners } from './utils/owner.handler';
import Navbar from "./components/navbar";
import { getKosan } from "./service/service";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      kosan: [],
      allKosan: [],
      selectedKosan: false,
      kosLocation: {},
      search: "",
    };
  }

  async componentDidMount() {
    const { error, data } = await getKosan();
    console.log(data.data);
    if (error) {
      console.log(error);
    } else {
      if (data.data) {
        this.setState((prev) => ({
          ...prev,
          kosan: data.data,
          allKosan: data.data,
        }));
      }
    }
    // getAllOwners();
  }

  selectKosan = (kosan) => {
    this.setState((prev) => ({ ...prev, kosLocation: kosan }));
    this.setState((prev) => ({ ...prev, selectedKosan: true }));
  };

  handleSearch = (event) => {
    this.setState({
      search: event.target.value,
      kosan: this.state.allKosan.filter((kosan) =>
        new RegExp(event.target.value, "i").exec(kosan.nama)
      ),
    });
  };

  handlekos = (event) => {
    // this.setState({
    //   search: event.target.value,
    //   kosan: this.state.allKosan.filter((kosan) => new RegExp(event.target.value, "i").exec(kosan.nama))
    // })
  };

  checkCookie(cookieName) {
    // const match = document.cookie.match(new RegExp('(^| )' + cookieName + '=([^;]+)'));
    // if (match) {
    //   return true;
    // } else {
    //   return false;
    // }
  }

  render() {
    let center = {
      lat: -7.761321,
      lng: 113.2372833,
    };
    return (
      <div className="app">
        <div className="main">
          <Navbar isLoggedIn={this.checkCookie("user")} />
          <div className="search">
            <input
              type="text"
              className="searchinput"
              placeholder="Search..."
              value={this.state.search}
              onChange={this.handleSearch}
            />
          </div>
          <div className="homestays">
            {this.state.kosan.map((kos) => {
              return (
                <Homestay
                  key={kos._id}
                  kosan={kos}
                  selectKosan={this.selectKosan}
                />
              );
            })}
          </div>
        </div>
        <div className="peta">
          <GoogleMapReact center={center} zoom={12}>
            {this.state.allKosan.map((item) => {
              const lat = Number(item.lat);
              const long = Number(item.long);
              console.log(item);
              return (
                <Marker
                  key={item._id}
                  lat={lat}
                  lng={long}
                  text={item.harga}
                  selected={true}
                />
              );
            })}
          </GoogleMapReact>
        </div>
      </div>
    );
  }
}

export default Home;

