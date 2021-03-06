import Head from "next/head";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Tweets from "components/Tweets";
import prisma from "lib/prisma";
import { getTweets } from "lib/data.js";

export default function Home({ tweets }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return null;
  }

  if (session) {
    router.push("/home");
  }

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="mt-10">
        <Tweets tweets={tweets.slice(0, 3)} />
        <p className="text-center p-4 border m-4">
          <h2 className="mb-10">Join the conversation!</h2>
          <a
            className="border px-8 py-2 mt-5 font-bold rounded-full color-accent-contrast bg-color-accent hover:bg-color-accent-hover-darker"
            href="/api/auth/signin"
          >
            login
          </a>
        </p>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  let tweets = await getTweets(prisma);
  tweets = JSON.parse(JSON.stringify(tweets));

  return {
    props: {
      tweets,
    },
  };
}
