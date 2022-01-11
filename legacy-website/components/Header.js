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

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

export const navLinks = [
  { title: 'home', path: '/' },
];

const Header = () => {
  return (
    <>
    <HideOnScroll>
        <AppBar position="fixed" elevation={0}>
          <Toolbar>
            <Container
              maxWidth="lg"
              sx={{ display: `flex`, justifyContent: `space-between`, alignItems: 'center' }}
            >
              <Navbar navLinks={navLinks} />
              <SideDrawer navLinks={navLinks} />
            </Container>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Offset id="back-to-top-anchor" />
      <BackToTop>
        <Fab color="primary" size="large" aria-label="back to top">
          <KeyboardArrowUp />
        </Fab>
      </BackToTop>
    </>
  );
};

export default Header;
