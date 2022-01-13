import Head from "next/head";
import MuiNextLink from "@components/core-components/MuiNextLink";
import AddGuestListForm from "@components/AddGuestbookForm";

export default function Install() {
  return (
    <div>
      <Head>
        <title>Legacy.xyz</title>
        <meta name="description" content="Leave your online legacy" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AddGuestListForm />
    </div>
  );
}
