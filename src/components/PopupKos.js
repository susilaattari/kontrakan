import React, { useState } from "react";
import "./PopupKos.css";
import ImageSlider from "./ImageSlider";

function formatRupiah(angka){
    var number_string = angka.replace(/[^,\d]/g, '').toString(),
    split   		= number_string.split(','),
    sisa     		= split[0].length % 3,
    rupiah     		= split[0].substr(0, sisa),
    ribuan     		= split[0].substr(sisa).match(/\d{3}/gi);
    if(ribuan){
      let separator = sisa ? '.' : '';
      rupiah += separator + ribuan.join('.');
    }
    rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
    return rupiah;
};

function PopupKos({
    kosan,
    onClose,
    ...props
}) {
    return(
        <div className="containerPopup" id="containerPopup" onClick={e => {onClose(e)}}>
            <div className="popupContent">
                <div className="popupImg">
                    <ImageSlider fotos={kosan.foto} />
                    {/* <div className="popupImgNavaSlide" style={{left: 0}}>{"<"}</div> */}
                    {/* <img src={kosan.foto} alt={kosan.nama} /> */}
                    {/* <div className="popupImgNavaSlide" style={{right: 0}}>{">"}</div> */}
                </div>
                <div className="popupkosanInfo">
                    <div className="popupkosanInfoNama">{kosan.nama}</div>
                    <div className="popupkosanInfoDs">{kosan.deskripsi}</div>
                    <div className="popupkosanInfoharga">Wa : {kosan.wa}</div>
                    <div className="popupkosanInfoharga">Rp{formatRupiah(kosan.harga)}</div>
                </div>
            </div>
        </div>
    )
};

export default PopupKos;