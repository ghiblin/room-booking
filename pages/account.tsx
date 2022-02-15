import { NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import Head from "next/head";

const AccountPage: NextPage = () => {
  const { data: session, status } = useSession();

  if (typeof window !== "undefined" && status === "loading") return null;

  return (
    <>
      <Head>Room Booking - Account</Head>
      {!session ? <h1>Access denied</h1> : session.user.name}
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
};

export default AccountPage;
