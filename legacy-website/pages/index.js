import Head from 'next/head';
import MuiNextLink from '@components/core-components/MuiNextLink';
import AddGuestListForm from '@components/AddGuestbookForm';
import Image from 'next/image'
import headerBackground from "../public/background.svg"
import { Button, Container, Stack, Typography } from '@mui/material';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Legacy.xyz</title>
        <meta name="description" content="Leave your online legacy" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Stack alignItems="center" spacing={4}>
        <Typography variant='h1' sx={{pt: 2}}>curate your digital legacy.</Typography>
        <Typography variant="body1">
          Enable supporters of your project to leave a digital signature once they’ve visited your website.  A new era of social proof, and discovery of content.
        </Typography>
        <Stack direction="row" spacing={3}>
          <Button variant="contained" size="large" sx={{
            border: '4px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '16px',
            width: '150px',
            height: '60px',
            backgroundColor: '#3f8758',
          }}>
            Sign
          </Button>
          <Button variant="outlined" sx={{
            borderRadius: '16px',
            width: '150px',
            height: '60px',
          }}>
            Install
          </Button>
        </Stack>
        <Image alt="header background" src={headerBackground}/>
        <AddGuestListForm/>
      </Stack>
    </div>
  )
}
