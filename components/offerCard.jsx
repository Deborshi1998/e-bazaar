import Image from "next/image";
import React, { useRef, useEffect } from "react";
import styles from "../styles/Offers.module.css";
function OfferCard({ header, info, imageSrc }) {
  const tiltRef = useRef(null);
  const handleMove = (e) => {
    const height = tiltRef.current.clientHeight;
    const width = tiltRef.current.clientWidth;

    const xVal = e.layerX;
    const yVal = e.layerY;

    const yRotation = 10 * ((xVal - width / 2) / width);
    const xRotation = -10 * ((yVal - height / 2) / height);

    const string = `perspective(500px) scale(1) rotateX(${xRotation}deg) rotateY(${yRotation}deg)`;

    tiltRef.current.style.transform = string;
  };
  const handleMouseOut = () => {
    tiltRef.current.style.transform =
      "perspective(500px) scale(1) rotateX(0) rotateY(0)";
  };

  useEffect(() => {
    tiltRef.current.addEventListener("mousemove", handleMove);

    return () => {
      if (tiltRef.current != null)
        tiltRef.current.removeEventListener("mousemove", handleMove);
    };
  }, []);

  return (
    <div
      className={styles.card_body}
      //   id="tilt"
      ref={tiltRef}
      onMouseMove={handleMove}
      onMouseOut={handleMouseOut}
    >
      <div className={styles.card_body_img}>
        <Image
          alt={`product image for ${header}`}
          src={imageSrc}
          width={296}
          height={200}
          className={styles.card_image_item}
        />
      </div>
      <div className={styles.card_body_header}>
        <span> {header} </span>
      </div>
      <div className={styles.card_body_info}>
        <span>{info} </span>
      </div>
    </div>
  );
}

export default OfferCard;
