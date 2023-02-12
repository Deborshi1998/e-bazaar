import React from 'react'
import styles from '../styles/Offers.module.css'
import featureStyles from "../styles/Featured.module.css";
import ProductCard from './productCard';

 function Featured({dataProducts}) {
  return (
    <div
      id="feature"
      style={{
        background: "rgb(255,255,255)",
        background:
          "linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(254,199,0,1) 100%)",
      }}
      className={styles.offers}
    >
      <div
        style={{
          backgroundColor: "#8BBCFF",
        }}
        className={styles.offers_top}
      >
        <div>
          <span>Featured</span>
        </div>
      </div>
      <div className={featureStyles.cards}>
        {dataProducts.map((product, index) => {
          return (
            <ProductCard
              className={featureStyles.card}
              key={index}
              product = {product}
            />
          );
        })}
      </div>
    </div>
  );
}


export default Featured;




