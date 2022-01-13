

import Head from 'next/head';
import MuiNextLink from '@components/core-components/MuiNextLink';
import AddGuestListForm from '@components/AddGuestbookForm';
import Image from 'next/image'
import headerBackground from "../public/background.svg"
import { Button, Container, Stack, Typography } from '@mui/material';export default function Install() {

    return (
<div>
      <Head>
        <title>Legacy.xyz</title>
        <meta name="description" content="Leave your online legacy" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Stack alignItems="center" spacing={4}>
        <Typography variant='h2' sx={{pt: 2}}>Add a guestbook to your website</Typography>
        <Typography variant="body1">
          Fill the form below to allow users to discover and sign your website as part of their digital legacy
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