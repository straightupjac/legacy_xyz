import React from "react";
import styles from "./guestbook.module.css"


const SignLegacy = () => {
  return (
    <>
      <div className={styles.guestbookDescription}>
        <p>Thank you for visiting my corner on the internet. To leave your digital footprint here, please sign by clicking the button below. By signing, this signature will be part of your legacy on the blockchain. </p>
        <a href="/">Learn more here</a>
        <button className={styles.signButton}>
          Sign here
        </button>
      </div>
    </>
  );
};

export default SignLegacy;
