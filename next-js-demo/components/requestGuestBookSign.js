import React from "react";
import styles from "./guestbook.module.css"

const RequestGuestBookSign = () => {
  return (
    <>
    <div className={styles.guestbookDescription}>
    <p>Thank you for visiting my corner on the internet. To leave your digital footprint here, please sign by clicking the button below.  By signing, this document will be part of your endorsement history on the Arweave blockchain. </p>
    <a href="www.google.com">Learn more here</a>
    <button>
      Sign here
    </button>
    </div>
    </>
  );
};

export default RequestGuestBookSign;
