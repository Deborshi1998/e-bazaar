import Footer from "../components/footer";
import Navbar from "../components/navbar";
import "../styles/globals.css";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import LoadingSpinner from "../components/loadingSpinner";
import store from "../store/store";
import { Provider } from "react-redux";
export default function App({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  //Handles the loading spinner on page change.
  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, []);


  return (
    <>
      <Provider store={store}>
        <Navbar
        />
        {loading ? <LoadingSpinner /> : <Component {...pageProps} />}
        <Footer />
      </Provider>
    </>
  );
}
