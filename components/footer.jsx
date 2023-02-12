import React from 'react'
import styles from '../styles/Footer.module.css'
import Image from 'next/image'
import Link from 'next/link';
function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.logo}>
        <Image
          alt="logo-footer"
          src={
            "https://firebasestorage.googleapis.com/v0/b/e-com-5bd83.appspot.com/o/public%2Flogo.png?alt=media&token=28f47f91-cb5c-480f-9685-a0d048b86a12"
          }
          width={150}
          height={55}
        />
      </div>
      <div className={styles.menu}>
        <ul className={styles.ul}>
          <li>
            <Link href="/" className={styles.link}>
              Home
            </Link>
          </li>
          <li>FAQ</li>
          <li>Privacy Policy</li>
          <li>Terms of Service</li>
        </ul>
      </div>
      <div className={styles.menu}>
        <ul>
          <li>basumatary18@gmail.com</li>
          <li>(777)-777-7777</li>
        </ul>
      </div>
      <div className={styles.social}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 64 64"
          width="50px"
          height="50px"
        >
          <path d="M48,7H16c-4.418,0-8,3.582-8,8v32c0,4.418,3.582,8,8,8h17V38h-6v-7h6v-5c0-7,4-11,10-11c3.133,0,5,1,5,1v6h-4 c-2.86,0-4,2.093-4,4v5h7l-1,7h-6v17h8c4.418,0,8-3.582,8-8V15C56,10.582,52.418,7,48,7z" />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 64 64"
          width="50px"
          height="50px"
        >
          <path d="M32,23c-4.971,0-9,4.029-9,9s4.029,9,9,9s9-4.029,9-9S36.971,23,32,23z" />
          <path d="M42.415,7H21.581C13.542,7,7,13.544,7,21.585v20.833C7,50.458,13.544,57,21.585,57h20.833C50.458,57,57,50.456,57,42.415	V21.581C57,13.542,50.456,7,42.415,7z M32,45c-7.17,0-13-5.831-13-13s5.83-13,13-13s13,5.83,13,13S39.169,45,32,45z M47,19	c-1.104,0-2-0.896-2-2s0.896-2,2-2s2,0.896,2,2S48.104,19,47,19z" />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 64 64"
          width="50px"
          height="50px"
        >
          <path d="M61.932,15.439c-2.099,0.93-4.356,1.55-6.737,1.843c2.421-1.437,4.283-3.729,5.157-6.437	c-2.265,1.328-4.774,2.303-7.444,2.817C50.776,11.402,47.735,10,44.366,10c-6.472,0-11.717,5.2-11.717,11.611	c0,0.907,0.106,1.791,0.306,2.649c-9.736-0.489-18.371-5.117-24.148-12.141c-1.015,1.716-1.586,3.726-1.586,5.847	c0,4.031,2.064,7.579,5.211,9.67c-1.921-0.059-3.729-0.593-5.312-1.45c0,0.035,0,0.087,0,0.136c0,5.633,4.04,10.323,9.395,11.391	c-0.979,0.268-2.013,0.417-3.079,0.417c-0.757,0-1.494-0.086-2.208-0.214c1.491,4.603,5.817,7.968,10.942,8.067	c-4.01,3.109-9.06,4.971-14.552,4.971c-0.949,0-1.876-0.054-2.793-0.165C10.012,54.074,16.173,56,22.786,56	c21.549,0,33.337-17.696,33.337-33.047c0-0.503-0.016-1.004-0.04-1.499C58.384,19.83,60.366,17.78,61.932,15.439" />
        </svg>
      <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" width="50px" height="50px">    <path d="M21,5c0,0-3-1-9-1S3,5,3,5s-1,3-1,7s1,7,1,7s3,1,9,1s9-1,9-1s1-3,1-7S21,5,21,5z M10,15.464V8.536L16,12L10,15.464z"/></svg>
      </div>
    </div>
  );
}

export default Footer