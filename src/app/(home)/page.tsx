import { HydrateClient, trpc } from "@/trpc/server";
import { PageClient } from "./client";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export default async function Home() {

  await trpc.hello.prefetch({
    text: "meow"
  });

  return (
    <HydrateClient>
      <Suspense fallback={<p>loading..</p>}>
        <ErrorBoundary fallback={<p>Error..</p>}>
          <PageClient />
        </ErrorBoundary>
      </Suspense>
    </HydrateClient>
  );
}
