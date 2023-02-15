import * as React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Gallery, GalleryImage } from "react-gesture-gallery";
 
function ImageSlider({ fotos, ...props }) {
  const [index, setIndex] = React.useState(0);
  const [stateCom, setStateCom] = useState({
    listFoto: [],
  });

  useEffect(() => {
    const list = fotos.map(it => {
      return { src: it }
    });
    setStateCom(v => ({ ...v, listFoto: list }))
  }, [])
 

  return (
    <div style={{ background: "black", width: "100%",}}>
      <Gallery
        index={index}
        onRequestChange={i => {
          setIndex(i);
        }}
      >
        {stateCom.listFoto.map(img => (
          <GalleryImage objectFit="contain" key={img.src} src={img.src} />
        ))}
      </Gallery>
    </div>
  );
}

export default ImageSlider;