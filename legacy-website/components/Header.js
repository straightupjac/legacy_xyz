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

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

export const navLinks = [
  { title: 'home', path: '/' },
];

const Header = () => {
  return (
    <>

    <div className = {styles.navigation}>
            <div>
                <p> LOGO </p>
            </div>
            <div>
                <a  href="https://gmail.com/">Docs</a>
                <a  href="https://google.com/images">Account </a>
            </div>
        </div>
        

    </>
  );
};

export default Header;
