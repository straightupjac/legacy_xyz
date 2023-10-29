import Head from "next/head";
import { useState } from "react";
import { Stack, Typography } from "@mui/material";
import dynamic from 'next/dynamic'

const SignLegacy = dynamic(() =>
  import('legacy-xyz').then((legacy) => legacy.SignLegacy),
  { ssr: false }
) // Async API cannot be server-side rendered

const SignersList = dynamic(() =>
  import('legacy-xyz').then((legacy) => legacy.SignersList),
  { ssr: false }
) // Async API cannot be server-side rendered

export default function Install() {
  const [state, setState] = useState(0);
  const [projectId, setProjectId] = useState();

  return (
    <div>
      <Head>
        <title>Hack lodge - web3legacy.xyz</title>
        <meta name="description" content="Leave your online legacy" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Stack alignItems="center" spacing={4} sx={{ px: 2 }}>
        <Typography variant="h1" sx={{ pt: 2 }}>
          Thanks for attending HackLodge!
        </Typography>
        <Typography variant="body1">
          Enable supporters of your project to leave a digital signature once
          they’ve visited your website. A new era of social proof, and discovery
          of content.
        </Typography>
        <Typography variant="caption">
          (Feel free to use a burner ETH address and pseudonymous name, but a real Twitter is required)
        </Typography>
        <SignLegacy projectId={'hacklodge'}
          message={'Thank you for attending HackLodge 2022! By signing, this signature will be part of your legacy on the blockchain.'}
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
        />
        <SignersList projectId={'hacklodge'}
        />
      </Stack>
    </div>
  );
}
