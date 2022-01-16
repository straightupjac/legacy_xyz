import { Button, Stack, Typography } from "@mui/material";
import Link from "next/link";
import MuiNextLink from '@components/core-components/MuiNextLink';
import TwitterIcon from '@mui/icons-material/Twitter';
import Head from "next/head";

const DiscoverProject = ({ name, link, twitter, description }) => {
  return (
    <li>
      <Stack direction={{ xs: 'column', sm: 'column', md: ' row' }}>
        <Stack direction="row">
          <MuiNextLink href={link} target="_blank">
            <Typography variant="body1">
              {name}
            </Typography>
          </MuiNextLink>
          {twitter && <MuiNextLink href={twitter} target="_blank" sx={{ ml: 2, mr: 2 }}>
            <TwitterIcon />
          </MuiNextLink>}
        </Stack>
        {description && `${description}`}
      </Stack>
    </li>
  )
}

export default function Home() {
  return (
    <>
      <Head>
        <title>Discover - web3legacy.xyz</title>
        <meta name="description" content="Leave your online legacy" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Stack alignItems="center" spacing={4} sx={{ minHeight: '80vh', px: 2 }}>
        <Typography variant="h1" sx={{ pt: 2 }}>
          Discover Legacies.
        </Typography>
        <Typography variant="h6">
          {`Discover digital corners with legacy-xyz guestbooks.`}
        </Typography>
        <ul>
          <DiscoverProject name="straightupjac"
            link="https://jaclynchan.me/"
            twitter="https://twitter.com/straightupjac"
            description="straightupjac's personal website"
          />
        </ul>
        <Link passHref href="/">
          <Button
            variant="outlined"
            sx={{
              borderRadius: "16px",
              width: "150px",
              height: "60px",
            }}
          >
            Add your site
          </Button>
        </Link>
      </Stack>
    </>
  );
}
