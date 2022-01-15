import { Button, Stack, Typography } from "@mui/material";
import Head from "next/head";
import dynamic from 'next/dynamic'
import Image from "next/image";
import Link from "next/link";
import headerBackground from "../public/background.svg";
import { useRef } from "react";

const SignLegacy = dynamic(() =>
  import('legacy-xyz').then((legacy) => legacy.SignLegacy),
  { ssr: false }
) // Async API cannot be server-side rendered

const SignersList = dynamic(() =>
  import('legacy-xyz').then((legacy) => legacy.SignersList),
  { ssr: false }
) // Async API cannot be server-side rendered

export default function Home() {
  const signRef = useRef(null)
  const executeScroll = () => signRef.current.scrollIntoView()

  return (
    <div>
      <Head>
        <title>Legacy.xyz</title>
        <meta name="description" content="Leave your online legacy" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Stack alignItems="center" spacing={4}>
        <Typography variant="h1" sx={{ pt: 2 }}>
          curate your digital legacy.
        </Typography>
        <Typography variant="body1">
          Enable supporters of your project to leave a digital signature once
          they’ve visited your website. A new era of social proof, and discovery
          of content.
        </Typography>
        <Stack direction="row" spacing={3}>
          <Button
            variant="contained"
            size="large"
            sx={{
              border: "4px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "16px",
              height: "60px",
              backgroundColor: "#3f8758",
            }}
            onClick={executeScroll}
          >
            Sign
          </Button>
          <Link passHref href="/install">
            <Button
              variant="outlined"
              sx={{
                borderRadius: "16px",
                width: "150px",
                height: "60px",
              }}
            >
              Add to site
            </Button>
          </Link>
        </Stack>
        <Image alt="header background" src={headerBackground} />
        <Stack id="sign" ref={signRef} spacing={4} sx={{ px: '1rem' }}>
          <SignLegacy projectId={'legacyxyz'}
            message={'Thank you for visiting our corner of the internet. To leave your legacy here, please sign below. By signing, this signature will be part of your legacy on the blockchain.'}
            buttonStyle={
              {
                border: "4px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "16px",
                height: "60px",
                backgroundColor: "#3f8758",
                textTransform: 'none',
                fontSize: 20,
                ':hover': { background: '#3f8758', opacity: 0.8 }
              }
            }
            showLegacy={false}
          />
          <SignersList projectId={'legacyxyz'}
          />
        </Stack>
      </Stack>
    </div>
  );
}
