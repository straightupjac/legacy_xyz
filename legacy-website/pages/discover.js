import { Button, Stack, Typography } from "@mui/material";
import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <Stack alignItems="center" spacing={4} sx={{ minHeight: '80vh' }}>
      <Typography variant="h1" sx={{ pt: 2 }}>
        Discover Legacies.
      </Typography>
      <Typography variant="h6">
        {`Discover digital corners with legacy-xyz guestbooks.`}
      </Typography>
      <Typography variant="body1">

      </Typography>
      <Stack direction="row" spacing={3}>
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
    </Stack>
  );
}
