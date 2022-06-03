import NewTweet from "components/NewTweet";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Tweets from "../components/Tweets";
import prisma from "lib/prisma";
import { getTweets } from "lib/data.js";
import LoadMore from "components/LoadMore";
import { useState } from "react";

export default function Home({ initialTweets }) {
  const { data: session, status } = useSession();
  const [tweets, setTweets] = useState(initialTweets);

  const loading = status === "loading";
  const router = useRouter();

  if (loading) {
    return null;
  }

  if (session && !session.user.name) {
    router.push("/setup");
  }

  return (
    <>
      <NewTweet tweets={tweets} setTweets={setTweets} />
      <Tweets tweets={tweets} />
      <LoadMore tweets={tweets} setTweets={setTweets} />
    </>
  );
}

export async function getServerSideProps() {
  let tweets = await getTweets(prisma, 2);
  tweets = JSON.parse(JSON.stringify(tweets));

  return {
    props: {
      initialTweets: tweets,
    },
  };
}
