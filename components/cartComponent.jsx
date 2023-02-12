import styles from "../styles/Cart.module.css";
import Image from "next/image";
import {
  buyProduct,
  addToCart,
  addToCartFirebase,
  removeFromCartFirebase,
  removeFromCart,
  selectUserCart,
  selectUserCartTotal,
  selectUserCartTotalPrice,
  checkoutCartFirebase,
} from "../store/cart/userCart";
import { selectUserToken } from "../store/cart/userToken";
import { useSelector, useDispatch } from "react-redux";

function CartComponent({bottomMargin}) {
  const totalItems = useSelector(selectUserCartTotal);
  const totalPrice = useSelector(selectUserCartTotalPrice);
  const products = useSelector(selectUserCart);
  const dispatch = useDispatch();
  const usertoken = useSelector(selectUserToken);
  const handleAdd = (product) => {
    if(!usertoken.userToken){
    dispatch(addToCart({id:product.id}));
    }
    else{
      dispatch(addToCartFirebase({ id: product.id, fullproduct:null, token: usertoken.userToken }));
    }
  };

  const handleRemove = (product) => {
    if(!usertoken.userToken){
    dispatch(removeFromCart({id: product.id}));
    }
    else{
      dispatch(removeFromCartFirebase({ id: product.id, token: usertoken.userToken }));
    }
  };
  const handleBuy = () => {
    const isSure = confirm("Are you sure you want to buy these items?");
    if(!usertoken.userToken){
      alert("Thank you for buying");
      dispatch(buyProduct());
      return;
    }
    if (isSure) {
      dispatch(checkoutCartFirebase({cart:products,  token:usertoken.userToken}))
      alert("Thank you for buying");
    }
  };



  return (
    <div
      style={{
        marginBottom: `${bottomMargin}`,
      }}
      className={totalItems > 0 ? styles.Cart_Body : styles.Cart_Body_empty}
    >
      <div className={styles.header}>
        <span>Cart</span>
      </div>
      <div className={styles.price_info_section}>
        <div className={styles.price_info}>
          <span>
            Total Price({totalItems} items): <b> ${totalPrice} </b>
          </span>
        </div>
        <div>
          <button
            style={{
              display: totalItems > 0 ? "block" : "none",
            }}
            className={styles.cart_buy_button}
            onClick={handleBuy}
          >
            Proceed to Buy{" "}
          </button>
        </div>
      </div>
      <div></div>
      <div className={styles.product_items_container}>
        {totalItems > 0 ? (
          <>
            {products.map((value, index) => {
              return (
                <div className={styles.product_item} key={value.id}>
                  <div className={styles.product_item_image}>
                    <Image
                      className={styles.product_image}
                      src={value.imageSrc}
                      alt="product_image"
                      width={150}
                      height={120}
                    />
                  </div>
                  <div className={styles.product_item_info}>
                    <div className={styles.product_item_name}>
                      <span>{value.name}</span>
                    </div>

                    <div className={styles.product_item_quantity}>
                      <span>Quantity: {value.quantity}</span>
                    </div>
                    <div className={styles.product_item_button}>
                      <button
                        onClick={() => handleAdd(value)}
                        className={styles.add_button}
                      >
                        Add
                      </button>

                      <button
                        onClick={() => handleRemove(value)}
                        className={styles.remove_button}
                      >
                        Remove
                      </button>
                    </div>
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
        <div className={styles.bottom_price_info}>
          <span>
            Total({totalItems} items): <b> ${totalPrice} </b>
          </span>
        </div>
      </div>
    </div>
  );
}

export default CartComponent;
