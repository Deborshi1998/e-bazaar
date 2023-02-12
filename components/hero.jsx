import Image from "next/image";
import React from "react";
import styles from "../styles/Home.module.css";
function Hero() {
  return (
    <div className={styles.hero}>
      <div className={styles.hero_left}>
        <div className={styles.hero_left_content}>
          <div className={styles.hero_left_textbox1}>
            <span>Welcome to E&#8209;Bazaar</span>
          </div>
          <div className={styles.hero_left_textbox}>
            <span>Elevate your style, elevate your life.</span>
          </div>
          <div className={styles.hero_left_textbox}>
            <span>Elevate your home, elevate your life.</span>
          </div>
          <div className={styles.hero_left_button}>
            <button>Explore</button>
          </div>
        </div>
      </div>
      <div className={styles.hero_right}>
        <Image
          alt="Showcase image for E-Bazaar"
          className={styles.hero_right_img}
          src={`https://firebasestorage.googleapis.com/v0/b/e-com-5bd83.appspot.com/o/Hero-img.png?alt=media&token=fc128ae0-8b6a-450e-bee6-cd202c5e7344`}
          width={310}
          height={350}
        />
      </div>
    </div>
  );
}

export default Hero;
