import Image from "next/image";
import React from "react";
import styles from "../styles/ProductCard.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  addToCartFirebase,
  selectUserCartError,
  selectUserCartLoading,
} from "../store/cart/userCart";
import { selectUserToken } from "../store/cart/userToken";
import toast, { Toaster } from "react-hot-toast";

function ProductCard({ product }) {
  const { image, product_name: header, price } = product;
  const dispatch = useDispatch();
  const userToken = useSelector(selectUserToken);
  const errorStatus = useSelector(selectUserCartError);
  const loadingStatus = useSelector(selectUserCartLoading);
  const handleAddtoCart = () => {
    if (!userToken.userToken) {
      dispatch(addToCart(product));
      toast.success("Added to cart");
    } else {
      dispatch(
        addToCartFirebase({
          id: product.id,
          fullproduct: product,
          token: userToken.userToken,
        })
      );
      if (errorStatus && !loadingStatus) {
        toast.error("Something went wrong");
      } else if(!errorStatus && !loadingStatus) {
        toast.success("Added to cart");
      }
    }
  };
  return (
    <div className={styles.card_body}>
      <div className={styles.card_body_img}>
        <Toaster position="bottom-left" />
        <Image
          src={image}
          width={296}
          height={200}
          alt={`product image for ${header}`}
          className={styles.card_image_item}
        />
      </div>
      <div className={styles.card_body_header}>
        <span> {header} </span>
      </div>
      <div className={styles.card_body_price}>
        <span>
          <b>$ {price} </b>
        </span>
      </div>
      <div className={styles.buttons}>
        <div
          style={{
            width: "60%",
          }}
        >
          <button
            type="button"
            className={styles.button_left}
            onClick={handleAddtoCart}
          >
            <span>ADD TO CART</span>
          </button>
        </div>
        <div
          style={{
            width: "50%",
          }}
        >
          <button
            onClick={() => console.log(cart)}
            type="button"
            className={styles.button_right}
          >
            BUY NOW
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
