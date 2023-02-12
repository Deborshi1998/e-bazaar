import React from "react";
import { timeStampToDate } from "../../utils/otherFunctions";
import styles from "../../styles/Offers.module.css";
import featureStyles from "../../styles/Featured.module.css";
import ProductCard from "../../components/productCard";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../utils/firebaseSetup";
function AllProducts({ AllProducts }) {
  const header = "All Products";
  return (
    <div
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
          <span>{header}</span>
        </div>
      </div>
      <div className={featureStyles.cards}>
        {AllProducts.map((product, index) => {
          return (
            <ProductCard
              className={featureStyles.card}
              key={index}
              product={product}
            />
          );
        })}
      </div>
    </div>
  );
}

export default AllProducts;

export async function getServerSideProps(context) {
  const AllProducts = [];
  const q = query(collection(db, "products"));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    const { created_date, modified_date, ...rest } = doc.data();
    const docID = doc.id;
    AllProducts.push({
      id: docID,
      ...rest,
      created_date: timeStampToDate(created_date),
      modified_date: timeStampToDate(modified_date),
    });
  });

  return {
    props: {
      AllProducts,
    },
  };
}
