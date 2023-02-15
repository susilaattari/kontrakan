import axios from 'axios';
const domain = "http://localhost:5000";



const getKosan = async () => {
    const { data, error } = await axios.get(domain + "/kosan");
    return { data, error };
};


const createKosan = async (file) => {
    const { error, data } = await axios.post(domain + "/kosan", file, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return { error, data };
};

const updateKosan = async (id, kosan) => {
  console.log({id, kosan})
  await axios.patch(domain + "/kosan/" + id , kosan);
  return { data: { data: "Berhasil Update Kosan "} };
};  


const deleteKosan = async (kosid) => {
  const { data, error } = await axios.delete(domain + "/kosan/" + kosid);
  return { data, error };
};

const login = () => {

};

const register = () => {

};



const addFotoKosan = async (id, file) => {
  const { data, error } = await axios.post(domain + "/kosan/addfoto/" + id, file, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return { data, error };
}


const deleteFotoKosan = async (id, foto) => {
  console.log(id, foto)
  if(id && foto) {
    const { data, error } = await axios.delete(domain + `/fotoKos/${id}?foto=${foto}`);
    return { data, error };
  }
};


export {
    getKosan,
    createKosan,
    updateKosan,
    deleteKosan,
    login,
    register,
    addFotoKosan,
    deleteFotoKosan
};
