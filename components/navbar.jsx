import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUserCartTotal } from "../store/cart/userCart";
import { selectUserToken, logout } from "../store/cart/userToken";
import { useDispatch } from "react-redux";
import "animate.css";
import { useRouter } from "next/router";

function Navbar() {
  const dispatch = useDispatch();
  const router = useRouter();
  const cart = useSelector(selectUserCartTotal);
  const token = useSelector(selectUserToken);
  const [isClickBurger, setisClickBurger] = useState(false);
  const columnStyleNavbar = "navbar-column";
  const columnStyleNavbarRight = "navbar-right-items-column";

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 830) {
        setisClickBurger(false);
      }
    }
    function handleChangeRoute() {
      setisClickBurger(false);
    }

    router.events.on("routeChangeStart", handleChangeRoute);

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
      router.events.off("routeChangeStart", handleChangeRoute);
    };
  }, []);

  return (
    <div className="navbar-parent">
      <nav className={isClickBurger ? columnStyleNavbar : "navbar"}>
        <div className="navbar-left ">
          <div>
            <Link href="/">
              <Image
                alt="logo"
                style={{
                  marginTop: "-0.2px",
                }}
                src={
                  "https://firebasestorage.googleapis.com/v0/b/e-com-5bd83.appspot.com/o/public%2Flogo.png?alt=media&token=28f47f91-cb5c-480f-9685-a0d048b86a12"
                }
                width={150}
                height={55}
              />
            </Link>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <div className="mobile-cartItem">
              <Link href="/user/cart">
                <i className="fa badge fa-lg" value={cart}>
                  &#xf290;
                </i>
              </Link>
            </div>
            <button
              type="button"
              className="burger-button"
              onClick={() => setisClickBurger((oldState) => !oldState)}
            >
              {isClickBurger ? (
                <Image
                  alt="burger-button"
                  src={"/xmark-solid.svg"}
                  width={30}
                  height={20}
                />
              ) : (
                <Image
                  alt="cross-button"
                  src={"/bars-solid.svg"}
                  width={30}
                  height={20}
                />
              )}
            </button>
          </div>
        </div>

        <div
          className={
            isClickBurger
              ? "navbar-right-column animate__animated animate__fadeIn"
              : "navbar-right"
          }
        >
          <ul
            className={
              isClickBurger ? columnStyleNavbarRight : "navbar-right-items "
            }
          >
            <li>
              <Link href="/" className="navbar-right-link">
                <span>Home</span>
              </Link>
            </li>
            <li className="dropdown-li">
              <div className="dropdown">
                <button className="dropbtn">Categories</button>
                <div className="dropdown-content animate__animated animate__fadeIn ">
                  <Link href="/categories/fashion">Fashion</Link>
                  <Link href="/categories/tech">Tech</Link>
                  <Link href="/categories/home">Home</Link>
                  <Link href="/categories/book">Books</Link>
                </div>
              </div>
            </li>

            <li>
              
              <Link href="/user/profile" className="navbar-right-link">
                <span>Profile</span>
              </Link>
            </li>
            <li>
              <Link href="/products/allproducts" className="navbar-right-link">
                <span>All Products</span>
              </Link>
            </li>

            <li className="nav-cartItem">
              <div>
                <Link href="/user/cart">
                  <i className="fa badge fa-lg" value={cart}>
                    &#xf290;
                  </i>
                </Link>
              </div>
            </li>
            <li>
              {token.userToken === null ? (
                <Link href="/user/login" className="navbar-right-link">
                  <span>Login</span>
                </Link>
              ) : (
                <Link href="/user/login" className="navbar-right-link">
                  <span
                    onClick={(e) => {
                      dispatch(logout());
                    }}
                  >
                    Logout
                  </span>
                </Link>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
