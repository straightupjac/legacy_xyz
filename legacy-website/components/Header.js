import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import { styled } from "@mui/system";
import MuiNextLink from "@components/MuiNextLink";
import Navbar from '@components/Navbar'
import SideDrawer from "@components/SideDrawer";
import HideOnScroll from "@components/HideOnScroll";
import Fab from "@mui/material/Fab";
import KeyboardArrowUp from "@mui/icons-material/KeyboardArrowUp";
import BackToTop from "@components/BackToTop";
import styles from "./header.module.css"
import Link from 'next/link'


const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

export const navLinks = [
  { title: 'home', path: '/' },
];

const Header = () => {
  return (
    <>

    <div className = {styles.navigation}>
            <div>
                <p className={styles.logo}> 🌱 </p>
                <Link href="/Docs">Docs</Link> 
            </div>
            <div>
            <a  href="https://gmail.com/">Find guestbooks to sign</a>
                <a  href="https://google.com/images">Account </a>
            </div>
        </div>
        

    </>
  );
};

export default Header;
