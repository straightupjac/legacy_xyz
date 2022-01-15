import Box from "@mui/material/Box";
import styles from '@styles/Home.module.css';
import Typography from '@mui/material/Typography';
import MuiNextLink from '@components/core-components/MuiNextLink';
import { IconButton, Stack } from "@mui/material";
import { GitHub, Twitter } from "@mui/icons-material";

const Footer = () => {
  return (
    <Box component="footer" alignItems="center" className={styles.footer} sx={{ py: 5, px: 4 }}>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={4}
      >
        <MuiNextLink href="https://github.com/straightupjac/legacy_xyz" target="_blank">
          <IconButton>
            <GitHub />
          </IconButton>
        </MuiNextLink>
        <MuiNextLink href="https://twitter.com/legacy_xyz" target="_blank">
          <IconButton>
            <Twitter />
          </IconButton>
        </MuiNextLink>
        <Typography >
          legacy-xyz © {new Date().getFullYear()}
        </Typography>
      </Stack>
    </Box>);
};

export default Footer;
