import React, { useState, useEffect } from "react";
import styles from "../styles/cart.module.css";
import { db } from "../utils/firebaseSetup";
import { collection, doc, getDoc, query, where } from "firebase/firestore";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrders, selectUserOrder } from "../store/cart/userCart";
function PastOrder({ user }) {
  const dispatch = useDispatch();
  const userUID = JSON.parse(user.userToken);
  const orderList = useSelector(selectUserOrder);
  
  useEffect(() => {
    async function getOrder() {
   
      console.log("Order List", orderList);
      // console.log(userUID.uid);
      // const document = doc(db, "users", userUID.uid);
      // const docSnap = await getDoc(document, userUID);
      // if(docSnap.exists()){
      //   console.log(docSnap.data().orders)
      // }
    }

    if (user.userToken !== null) {
      dispatch(fetchOrders(userUID));
      getOrder();
    }
  }, []);

  const totalItems = 0;
  return (
    <div className={totalItems > 0 ? styles.Cart_Body : styles.Cart_Body_empty}>
      <div className={styles.header}>
        <span>Orders</span>
      </div>
      <div className={styles.price_info_section}>
        <div className={styles.price_info}></div>
        <div></div>
      </div>
      <button
        onClick={() => {
          console.log(orderList);
        }}
      >
        get state
      </button>
      <div></div>
      <div className={styles.product_items_container}>
        {orderList.length > 0 ? (
          <>
            {orderList.map((value, index) => {
              return (
                <div className={styles.product_item} key={value.id}>
                  <div className={styles.product_item_image}>
                    {/* <Image
                      className={styles.product_image}
                      src={value.imageSrc}
                      alt="product_image"
                      width={150}
                      height={120}
                    /> */}
                  </div>
                  <div className={styles.product_item_info}>
                    <div className={styles.product_item_name}>
                      <span>{value.name}</span>
                    </div>

                    <div className={styles.product_item_quantity}>
                      <span>Quantity: {value.quantity}</span>
                    </div>
                    {/* <div className={styles.product_item_button}>
                      <button
                        onClick={() => handleAdd(value.id)}
                        className={styles.add_button}
                      >
                        Add
                      </button>

                      <button
                        onClick={() => handleRemove(value.id)}
                        className={styles.remove_button}
                      >
                        Remove
                      </button>
                    </div> */}
                  </div>
                  <div className={styles.product_item_price}>
                    <span>${value.price}</span>
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          <h3>Cart is empty</h3>
        )}
        <div className={styles.bottom_price_info}></div>
      </div>
    </div>
  );
}

export default PastOrder;
