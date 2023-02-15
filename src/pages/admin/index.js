import React, { Component, useState } from 'react'
import Layout from '../../components/admin/layout'
import useOwnerStore from '../../store'
import { getKosan, deleteKosan, updateKosan } from "../../service/service";
import "./index.css"
import Swal from 'sweetalert2';
import editIkon from "../../components/edit-image.png"
import { Fragment } from 'react';
import { useRef } from 'react';
import { addFotoKosan, deleteFotoKosan } from "../../service/service";

export class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: this.checkCookie('user'),
      user: useOwnerStore.getState().user,
      kosan: [],
      kosedit: {},
      koseditShow: false,
    }
  }

  async gettingKos() {
    const { error, data } = await getKosan();
    console.log(data)
    if(!error) {
      this.setState(prev => ({ ...prev, kosan: data.data }));
    };
  }

  async componentDidMount() {
    document.title = 'Admin Panel - Dashboard'
    if (!this.state.isLoggedIn) {
      window.location.href = '/login'
    }
    // console.log(JSON.parse(this.getCookie('user')))
    this.gettingKos()
  }
  checkCookie(cookieName){
    const match = document.cookie.match(new RegExp('(^| )' + cookieName + '=([^;]+)'));
    if (match) {
      return true;
    } else {
      return false;
    }
  }
  getCookie(cookieName){
    const match = document.cookie.match(new RegExp('(^| )' + cookieName + '=([^;]+)'));
    if (match) {
      return match[2];
    } else {
      return null;
    }
  };

  render() {
    return (
      <Layout style={{ width: "100%"}}>
        <div className="content lsjdshfoiierf" style={{ width: "100%"}}>
          {
            this.state.kosan.map(item => {
              return ( <KosNode kos={item}/>)
            })
          }
        </div>
      </Layout>
    )
  }
};


function KosNode({ kos, ...props}) {
  const [editkos, setEditkos] = useState({
    show: false,
    editFotoShow: false
  });

  const [stsKosan, setStsKosan] = useState({
    _id: "",
    nama: "",
    deskripsi: "",
    harga: "",
  })

  const editKosan = (kosID) => {
    if(editkos.show) {
      setEditkos(prev => ({ ...prev, show: false }));
    } else {
      setStsKosan(prev => ({
        ...prev,
        _id: kosID,
        nama: kos.nama,
        deskripsi: kos.deskripsi,
        harga: kos.harga
      }));
      setEditkos(prev => ({ ...prev, show: true }));
    };
  };

  const updateKos = async () => {
    const { error, data } = await updateKosan(stsKosan._id, {
      nama: stsKosan.nama,
      deskripsi: stsKosan.deskripsi,
      harga: stsKosan.harga
    });
    if(error) {
      Swal.fire("Delete Kos Gagal");
    } else {
      Swal.fire(data.data).then(() => {
        window.location.reload();
      });
    }
  };

  const changeKosDa = (e) => {
    setStsKosan(prev => ({
      ...prev,
      ...e
    }));
  };


  const HapusKosan = async (kosID) => {
    console.log("DELETE", kosID)
    const { error, data } = await deleteKosan(kosID);

    if(error) {
      Swal.fire("Delete Kos Gagal");
    } else {
      Swal.fire(data.data).then(() => {
        window.location.reload();
      });
    }
    return 0;
  };



  const editGambar = () => {
    if(editkos.editFotoShow) {
      setEditkos(prev => ({ ...prev, editFotoShow: false }))
    } else {
      setEditkos(prev => ({ ...prev, editFotoShow: true }))
    }
  };

  
  return (
    <Fragment>
      
      {
        editkos.editFotoShow ? 
        <EditFoto idKos={kos.id} foto={kos.foto} onClose={(e) => {
          if(e.target.id === "dsihfoihfphjfp") {
            setEditkos(prev => ({ ...prev, editFotoShow: false }))
          }
        }} /> : null
      }

    <div className='asfjdqd'>

      <div className='jsfdahifh'  onClick={() => { editGambar() }}><img src={editIkon} alt="edit" /></div>

      <div className='sdsdwiIMG'>
        <img src={kos.foto && kos.foto[0] ? kos.foto[0] : ""} alt=""/>
      </div>
      {
        editkos.show ? 
        <div style={{width: "80%", margin: "10px 0"}}>

          <div className='idsfdwhfwhwodow'>
            Nama
            <input onChange={(e) => { changeKosDa({ nama: e.target.value }) }} type={"text"} value={stsKosan.nama}/>
          </div>
          <div className='idsfdwhfwhwodow'>
            Deskripsi
            <textarea onChange={(e) => { changeKosDa({ deskripsi: e.target.value }) }} type={"text"} value={stsKosan.deskripsi}/>
          </div>
          <div className='idsfdwhfwhwodow'>
            Harga
            <input onChange={(e) => { changeKosDa({ harga: e.target.value }) }} type={"text"} value={stsKosan.harga}/>
          </div>
          <button style={{marginTop: 10}} onClick={(e) => { updateKos() }}>Update</button>
        </div> : 
        <div className=''>
          { kos.nama }
        </div>
      }
      <div className='skdjNav'>
        <button onClick={() => { editKosan(kos.id) }}>
          Edit
        </button>
        <button onClick={(e) => { HapusKosan(kos.id); }}>
          Delete
        </button>
      </div>

  </div>
  </Fragment>
  )
};







const EditFoto = ({ idKos, foto, onClose, ...props }) => {
  const inpRef = useRef(null);

  const inpFotoOnChange = (e) => {
    if(e.target.files[0]) {
      const dataFoto = new FormData();
      dataFoto.append("file", e.target.files[0]);

      addFotoKosan(idKos, dataFoto).then((dataRes) => {
        console.log(dataRes)
        alert("Berhasil Tambah Foto");
        window.location.reload();
      })
    }
  };


  const addFoto = () => {
    inpRef.current.click()
  };
  const deleteFoto = async (idKosan, fotoLink) => {
    const { data, error } = await deleteFotoKosan(idKosan, fotoLink);
    alert("Sukses Hapus Foto Kos");
    window.location.reload();
  }

  return (
    <div className='editFotoContaner' id='dsihfoihfphjfp' onClick={(e) => { onClose(e) }}>
      <div className='editFotoContent'>
        {
          foto.map(item => {
            return(
              <div className='editFotoFotoContanr'>
                <div className='editFotoFotoContanrBtnDelete' onClick={() => { deleteFoto(idKos, item) }}>X</div>
                <img src={item} />
              </div>
            )
          })
        }
        <div className='buttontambahFoto' onClick={() => { addFoto() }}>
          <input onChange={(e) => { inpFotoOnChange(e) }} ref={inpRef} type="file" hidden/>
          Tambah Foto
        </div>
      </div>
    </div>
  )
};







export default Dashboard