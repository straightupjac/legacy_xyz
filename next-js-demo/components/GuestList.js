import React from "react";
import styles from "./guestbook.module.css"
import { Chip, Divider } from "@mui/material";

const GuestList = () => {
  return (
    <>
    <div className={styles.guestbookListWrapper}>
        <div>
            <h3>Guestbook</h3>
        </div>
        <div className={styles.guestbookListContainer}>
            <GuestListItem/>
            <GuestListItem/>
            <GuestListItem/>
            <GuestListItem/>
            <GuestListItem/>
        </div>
    </div>
    </>
  );
};

export default GuestList;


const GuestListItem = () => {
    return (
        <>
        <div className={styles.guestlistItemContainer}>
            <div>
            <p>Jaclyn Chan</p>
            <p className={styles.date}>Jan 10, 2022</p>
             </div>
        <div>
            <p>straightupjac.eth</p>
        </div>
        <div>
        <Chip label="@straightupJac" />
        </div>
        </div>
        <Divider />

        </>

    )
}

