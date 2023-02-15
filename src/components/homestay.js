import React, { Fragment, useState } from "react";
import "./homestay.css";
import PopupKos from "./PopupKos";

function formatRupiah(angka) {
  var number_string = angka.replace(/[^,\d]/g, "").toString(),
    split = number_string.split(","),
    sisa = split[0].length % 3;
  let rupiah = split[0].substr(0, sisa),
    ribuan = split[0].substr(sisa).match(/\d{3}/gi);
  if (ribuan) {
    let separator = sisa ? "." : "";
    rupiah += separator + ribuan.join(".");
  }
  rupiah = split[1] != undefined ? rupiah + "," + split[1] : rupiah;
  return rupiah;
}
const Homestay = ({ selectKosan, kosan, ...props }) => {
  const [kosState, setKosState] = useState({
    popup: false,
  });
  const closePopup = (e) => {
    if (e.target.id === "containerPopup") {
      setKosState((prv) => ({ ...prv, popup: false }));
    }
  };
  return (
    <Fragment>
      {kosState.popup ? (
        <PopupKos
          kosan={kosan}
          onClose={(e) => {
            closePopup(e);
          }}
        />
      ) : null}
      <div
        className="homestay"
        onClick={() => {
          setKosState((prv) => ({ ...prv, popup: true }));
        }}
      >
        <div className="homestay-foto">
          <img
            src={kosan.foto && kosan.foto[0] ? kosan.foto[0] : ""}
            alt={kosan.nama}
          />
        </div>

        <div>
          <div className="homestay-judul">{kosan.nama}</div>
          <div className="homestay-harga">Rp{formatRupiah(kosan.harga)}</div>
        </div>
      </div>
    </Fragment>
  );
};

export default Homestay;

