"use client";

import { trpc } from "@/trpc/client";
export default function Home() {
  const {data} = trpc.hello.useQuery({
    text : "meow"
  });
  return (
    <div>
      clienr comp says {data?.greeting}
    </div>
  );
}
