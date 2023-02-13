import Image from "next/image";
import React, { useState, useEffect } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useRouter } from "next/router";
import styles from "../../styles/Login.module.css";
import { login } from "../../store/cart/userToken";
import { useDispatch } from "react-redux";
import  {app, db} from "../../utils/firebaseSetup";
import { setDoc, doc } from "firebase/firestore";
import { fetchProducts } from "../../store/cart/userCart";
function Login() {
  const auth = getAuth(app);
  const router = useRouter();
  const dispatch = useDispatch();

  const loginInitialState = {
    email: "",
    password: "",
  };
  const signUpInitialState = {
    email: "",
    password: "",
  };
  const [loginPageState, setLoginPageState] = useState(loginInitialState);
  const [isSignUp, setIsSignUp] = useState(false);

  useEffect(() => {
    if (isSignUp) {
      setLoginPageState(signUpInitialState);
    } else {
      setLoginPageState(loginInitialState);
    }
  }, [isSignUp]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      createUserWithEmailAndPassword(
        auth,
        loginPageState.email,
        loginPageState.password
      ).then((userCredential) => {
          // Signed in
          const userdata = {cart:[], order:[]}
          const User = JSON.stringify(userCredential.user);
          setDoc(doc(db, "users", userCredential.user.uid), userdata, {
            auth: User,
          })
            .then(() => {
              console.log(
                "Document written with ID: ",
                userCredential.user.uid
              );
              router.push("/user/profile");
            })
            .catch((error) => {
              console.error("Error adding document: ", error);
            });
        
        }).catch((errorUserCreate) => {
          console.log(errorUserCreate);
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        loginPageState.email,
        loginPageState.password
      )
        .then((userCredential) => {
          // Login
          const user = userCredential.user;
          dispatch(login(JSON.stringify(user)));
          dispatch(fetchProducts(user))
          router.push("/user/profile");
        })
        .catch((error) => {
          // const errorCode = error.code;
          // const errorMessage = error.message;
          console.log(error);
        });
    }
  };

  return (
    <div>
      <div className={styles.login_body}>
        <div className={styles.login_body_left}>
          <div className={styles.login_body_left_header}>
            <h1>{isSignUp ? "SignUp" : "Login"}</h1>
          </div>
          <div className={styles.login_body_left_body}>
            <form className={styles.form} onSubmit={handleSubmit}>
              {Object.keys(loginPageState).map((key, index) => {
                return (
                  <div className={styles.form_body} key={index}>
                    <div className={styles.input_label}>
                      <label htmlFor={key}>
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </label>
                    </div>
                    <div className={styles.input_input}>
                      <input
                        required
                        className={styles.input_input_body}
                        type={key}
                        name={key}
                        value={loginPageState[key]}
                        placeholder={key}
                        onChange={(e) =>
                          setLoginPageState((oldState) => ({
                            ...oldState,
                            [key]: e.target.value,
                          }))
                        }
                      />
                    </div>
                  </div>
                );
              })}
              <div className={styles.login_body_left_footer}>
                <button
                  type="submit"
                  className={styles.login_body_left_footer_button}
                >
                  {isSignUp ? "SignUp" : "Login"}
                </button>
                <div className={styles.login_body_left_footer_text}>
                  <span onClick={() => setIsSignUp((oldValue) => !oldValue)}>
                    {isSignUp
                      ? "Already have an account?"
                      : "Don't have an account?"}
                  </span>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className={styles.login_body_right}>
          <Image
            className={styles.login_body_image}
            src="/login-anime.png"
            alt="login"
            width={400}
            height={400}
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
