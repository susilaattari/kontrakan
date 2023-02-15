import React, { Component } from 'react'
import Layout from '../../components/admin/layout'
import FileBase64 from 'react-file-base64'
import dotenv from 'dotenv'
import axios from 'axios'
import Swal from 'sweetalert2';
import { createKosan } from "../../service/service"




dotenv.config()




export class Kosan extends Component {
  constructor(props) {
    super(props)
    this.state = {
      nama_kos: '',
      deskripsi: '',
      no_wa: '',
      harga: '',
      lat: '',
      long: '',
      foto_kosan: '',
      data_kosan: [],
      upload_status: '',
      isLoggedIn: this.checkCookie('user'),
      user: JSON.parse(this.getCookie('user')),
    }
  }

  componentDidMount() {
    document.title = 'Admin Panel - Kosan'
    if (!this.state.isLoggedIn) {
      window.location.href = '/login'
    }
    this.getDataKosan()
    console.log(this.state.user)
  }

  checkCookie(cookieName) {
    const match = document.cookie.match(new RegExp('(^| )' + cookieName + '=([^;]+)'));
    if (match) {
      return true;
    } else {
      return false;
    }
  }
  getCookie(cookieName) {
    const match = document.cookie.match(new RegExp('(^| )' + cookieName + '=([^;]+)'));
    if (match) {
      return match[2];
    } else {
      return null;
    }
  }

  handleFile = (e) => {
    this.setState({
      foto_kosan: e.target.files[0]
    })
    this.handleUpload()
  }

  getFiles(files) {
    // this.setState({ foto_kosan: files[0].base64.split(',')[1] })
    console.log(files[0].base64.split(',')[1]);
    // this.handleUpload()
  }

  handleUpload = () => {
    this.setState({ upload_status: 'Uploading...' });
  };

  fileChanegHandler = (e) => {
    let data = new FormData();
    data.append("file", e.target);
    this.setState({ foto_kosan: data });
  };

  getDataKosan = () => {

  }

  handleSubmit = async (e) => {
    e.preventDefault()
    const { nama_kos, deskripsi, no_wa, harga, lat, long } = this.state
    var formData = new FormData();
    formData.append("file", this.state.foto_kosan);
    formData.append("body", JSON.stringify({
      nama: nama_kos,
      deskripsi: deskripsi,
      harga: harga,
      wa: no_wa,
      lat: lat,
      long: long,
      username: this.state.user.username
    }));
    const { error, data } = await createKosan(formData);
    if(error) {
      console.log(error)
      Swal.fire('Gagal', 'Data Kosan Gagal Ditambahkan!', 'error')
    } else {
      console.log(data)
      Swal.fire('Berhasil', 'Data Kosan Berhasil Ditambahkan!', 'success');
      window.location.reload()
    };
  };



  render() {
    return (
      <Layout>
        <div className="content" style={{ backgroundColor: '#f1f2f7' }}>
          <div className="animated fadeIn">
            <div className="row">
              <div className="col">
                <div className="card">
                  <div className="card-header">
                    <strong className="card-title">Tambah Data Kosan</strong>
                  </div>
                  <div className="card-body">
                    <form onSubmit={this.handleSubmit}>
                      <div className="form-group">
                        <label htmlFor="nama_kos" className='form-control-label'>Nama Kosan</label>
                        <input type="tel" name="nama_kos" id="nama_kos" className="form-control" style={{ width: '100%' }} value={this.state.nama_kos} onChange={e => this.setState({ nama_kos: e.target.value })} />
                      </div>
                      <div className="form-group">
                        <label htmlFor="deskripsi" className='form-control-label'>Deskripsi Kosan</label>
                        <textarea type="tel" name="deskripsi" id="deskripsi" className="form-control" style={{ width: '100%' }} value={this.state.deskripsi} onChange={e => this.setState({ deskripsi: e.target.value })} />
                      </div>
                      <div className="form-group">
                        <label htmlFor="harga">Harga Sewa (per bulan)</label>
                        <input type="number" name="harga" id="harga" className="form-control" style={{ width: '100%' }} value={this.state.harga} onChange={e => this.setState({ harga: e.target.value })} />
                      </div>
                      <div className="form-group">
                        <label htmlFor="harga">Nomor WhatsApp</label>
                        <input type="tel" name="wa" id="wa" className="form-control" style={{ width: '100%' }} value={this.state.no_wa} onChange={e => this.setState({ no_wa: e.target.value })} />
                      </div>
                      <div className="row">
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label htmlFor="lat" className="form-control-label">Latitude</label>
                            <input type="number" name="lat" id="lat" className="form-control" value={this.state.lat} onChange={e => this.setState({ lat: e.target.value })} />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label htmlFor="long" className="form-control-label">Longitude</label>
                            <input type="number" name="long" id="long" className="form-control" value={this.state.long} onChange={e => this.setState({ long: e.target.value })} />
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                          <label htmlFor="foto_kosan" className="form-control-label">Foto Kosan <span className="badge badge-success">Status: {this.state.upload_status}</span></label>
                        </div>
                        <div className="col-lg-6 col-md-6">
      
                          <input type={"file"} id="file" onChange={e => { this.setState({ foto_kosan: e.target.files[0] }) }} ></input> 
                          {/* <FileBase64 multiple={true} onDone={this.getFiles.bind(this)} /> */}
                        </div>
                      <button type="submit" className="btn btn-primary float-right mt-3"><i className="fa fa-fw fa-plus"></i>Tambah</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default Kosan