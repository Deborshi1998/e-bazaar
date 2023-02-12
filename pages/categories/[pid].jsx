import React from "react";
import { timeStampToDate } from "../../utils/otherFunctions";
import styles from "../../styles/Offers.module.css";
import featureStyles from "../../styles/Featured.module.css";
import ProductCard from "../../components/productCard";
import { collection, getDocs, where, query } from "firebase/firestore";
import { db } from "../../utils/firebaseSetup";
function Fashion({ fashionData, pid }) {
  const header = pid.charAt(0).toUpperCase() + pid.slice(1);
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
        {fashionData.map((product, index) => {
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

export default Fashion;

export async function getServerSideProps(context) {
  const { pid } = context.params;
  if (!["fashion", "home", "tech", "book"].includes(pid)) {
    return {
      notFound: true,
    };
  }

  const fashionData = [];
  const q = query(collection(db, "products"), where("categories", "==", pid));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    const { created_date, modified_date, ...rest } = doc.data();
    const docID = doc.id;
    fashionData.push({
      ...rest,
      id: docID,
      created_date: timeStampToDate(created_date),
      modified_date: timeStampToDate(modified_date),
    });
  });

  return {
    props: {
      fashionData,
      pid,
    },
  };
}
