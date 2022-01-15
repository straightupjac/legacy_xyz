import Head from "next/head";
import MuiNextLink from "@components/core-components/MuiNextLink";
import AddGuestListForm from "@components/AddGuestbookForm";
import GuestBookSuccess from "@components/GuestBookSuccess";
import { useState } from "react";

export default function Install() {
  const [state, setState] = useState(0);
  const [projectId, setProjectId] = useState();

  return (
    <div>
      <Head>
        <title>Legacy.xyz</title>
        <meta name="description" content="Leave your online legacy" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {state === 0 && <AddGuestListForm setState={setState} projectId={projectId} setProjectId={setProjectId} />}
      {state === 1 && <GuestBookSuccess setState={setState} />}
    </div>
  );
}
