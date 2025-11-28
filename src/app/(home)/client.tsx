"use client";

import { trpc } from "@/trpc/client";

export const PageClient = () => {
    const [data] = trpc.hello.useSuspenseQuery({
        text : "meow"
    })
    return (
       <div>page says {data.greeting}</div>
    )
}