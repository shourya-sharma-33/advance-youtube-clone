import { trpc } from "@/trpc/server";
import { PageClient } from "./client";
export default async function Home() {
   trpc.hello.prefetch({
    text : "meow"
  });
  return <PageClient/>;
}
