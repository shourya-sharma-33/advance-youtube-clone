/**
 * Clerk + Svix Webhook Handler
 *
 * This API route handles webhooks sent by Clerk via Svix.
 * It verifies the incoming webhook using the Svix signing secret,
 * and updates, deletes, or creates users in your database accordingly.
 */

import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { db } from '@/db'
import { users } from '@/db/schema'
import { eq } from 'drizzle-orm'

export async function POST(req: Request) {
    // 1️⃣ Retrieve the Svix signing secret from environment variables
    const SIGNING_SECRET = process.env.SIGNING_SECRET
    if (!SIGNING_SECRET) {
        throw new Error(
            'Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local'
        )
    }

    // 2️⃣ Initialize Svix webhook verifier
    const wh = new Webhook(SIGNING_SECRET)

    // 3️⃣ Get necessary Svix headers
    const headerPayload = await headers()
    const svix_id = headerPayload.get('svix-id')
    const svix_timestamp = headerPayload.get('svix-timestamp')
    const svix_signature = headerPayload.get('svix-signature')

    // 4️⃣ Ensure all required headers are present
    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response('Error: Missing Svix headers', { status: 400 })
    }

    // 5️⃣ Get the **raw body** as a string (required for Svix verification)
    const body = await req.text()

    let evt: WebhookEvent

    // 6️⃣ Verify the webhook using Svix
    try {
        evt = wh.verify(body, {
            'svix-id': svix_id,
            'svix-timestamp': svix_timestamp,
            'svix-signature': svix_signature,
        }) as WebhookEvent
    } catch (err) {
        console.error('Error: Could not verify webhook: ', err)
        return new Response('Error: Verification error', { status: 400 })
    }

    // 7️⃣ Log the webhook info
    const { id } = evt.data
    const eventType = evt.type
    console.log(`Received webhook with ID ${id} and event type: ${eventType}`)
    console.log('Webhook payload:', body)

    // 8️⃣ Handle user creation
    if (eventType === 'user.created') {
        const { data } = evt

        if (!data.id) {
            return new Response('Missing user id', { status: 400 })
        }

        await db.insert(users).values({
            clerkId: data.id,
            name: `${data.first_name} ${data.last_name}`,
            email: data.email_addresses?.[0]?.email_address ?? '',
            imageUrl: data.image_url ?? null,
            createdAt: new Date(),
        })

        console.log(`User with ID ${data.id} created in DB`)
    }

    // 9️⃣ Handle user updates
    if (eventType === 'user.updated') {
        const { data } = evt

        if (!data.id) {
            return new Response('Missing user id', { status: 400 })
        }

        await db
            .update(users)
            .set({
                name: `${data.first_name} ${data.last_name}`,
                imageUrl: data.image_url,
            })
            .where(eq(users.clerkId, data.id))

        console.log(`User with ID ${data.id} updated in DB`)
    }

    // 🔟 Handle user deletion
    if (eventType === 'user.deleted') {
        const { data } = evt

        if (!data.id) {
            return new Response('Missing user id', { status: 400 })
        }

        await db.delete(users).where(eq(users.clerkId, data.id))
        console.log(`User with ID ${data.id} deleted from DB`)
    }

    // ✅ Return a success response
    return new Response('Webhook received', { status: 200 })
}

export async function GET(req: Request) {
    console.log('Webhook GET hit');

    return new Response(
        JSON.stringify({
            message: 'Webhook route is working',
            method: 'GET',
            timestamp: new Date().toISOString(),
        }),
        {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );
}
