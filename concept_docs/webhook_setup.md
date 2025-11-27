# **Clerk + Svix Webhook Integration with NeonDB**

### **Concept Overview: Webhooks**

A **webhook** is a way for one application to send real-time data to another application whenever a certain event occurs.
In this project, the goal is to **sync Clerk user events (create, update, delete) with NeonDB** automatically.

**Why we need it:**

* Clerk manages user authentication.
* We want our database (NeonDB) to always have up-to-date user data.
* Webhooks allow Clerk to push these events to our backend in real-time.

---

### **Setup Overview**

#### 1️⃣ Ngrok Setup

Ngrok allows your local server to be publicly accessible over the internet, which is necessary for Clerk to send webhook requests.

**Steps:**

1. Create an account on [ngrok.com](https://ngrok.com).
2. Install the ngrok CLI and authenticate with your token.
3. Run ngrok to expose your local server:

   ```bash
   ngrok http 3000
   ```
4. Ngrok provides a public URL (e.g., `https://abcd1234.ngrok.io`) that we use to register the webhook in Clerk.

#### 2️⃣ Bun Setup

This project runs on **Bun**, a fast JavaScript runtime.

**Package.json setup for concurrently running local and ngrok server:**

```json
{
  "scripts": {
    "dev:all": "bun run dev & ngrok http 3000"
  }
}
```

* `bun run dev` → Runs the Next.js/Bun server locally.
* `ngrok http 3000` → Exposes the local server publicly.
* Both commands run concurrently for local development + webhook testing.

---

### **Webhook Route Setup**

#### **File Location**

```
/app/api/user/webhooks/route.ts
```

#### **Purpose**

This route handles **all webhook events sent by Clerk via Svix**, and performs:

* Verification of the webhook signature.
* Insert/update/delete operations in NeonDB.

---

### **Webhook Implementation Details**

1. **Retrieve Svix Signing Secret**

```ts
const SIGNING_SECRET = process.env.SIGNING_SECRET
```

* Found in Clerk Dashboard → Webhooks → Svix Signing Secret.
* Store it in `.env` or `.env.local`.

2. **Initialize Svix Webhook Verifier**

```ts
const wh = new Webhook(SIGNING_SECRET)
```

* `svix` package is used to verify incoming webhook requests.

3. **Extract Required Headers**

```ts
const headerPayload = await headers()
const svix_id = headerPayload.get('svix-id')
const svix_timestamp = headerPayload.get('svix-timestamp')
const svix_signature = headerPayload.get('svix-signature')
```

* Svix requires three headers for verification:

  * `svix-id`
  * `svix-timestamp`
  * `svix-signature`

4. **Verify Headers**

* If any headers are missing, respond with a `400` error.

5. **Get Raw Body**

```ts
const body = await req.text()
```

* Svix verification requires the **raw request body** as a string.

6. **Verify Webhook**

```ts
evt = wh.verify(body, {
  'svix-id': svix_id,
  'svix-timestamp': svix_timestamp,
  'svix-signature': svix_signature,
}) as WebhookEvent
```

* Throws an error if verification fails.

7. **Logging**

* Logs the webhook ID, type, and payload for debugging.

---

### **Handling User Events**

1. **User Creation (`user.created`)**

```ts
await db.insert(users).values({
    clerkId: data.id,
    name: `${data.first_name} ${data.last_name}`,
    email: data.email_addresses?.[0]?.email_address ?? '',
    imageUrl: data.image_url ?? null,
    createdAt: new Date(),
})
```

* Inserts a new user into `NeonDB`.
* Required fields: Clerk ID, name, email, image URL, timestamp.

2. **User Update (`user.updated`)**

```ts
await db.update(users)
    .set({
        name: `${data.first_name} ${data.last_name}`,
        imageUrl: data.image_url,
    })
    .where(eq(users.clerkId, data.id))
```

* Updates existing user data based on `clerkId`.

3. **User Deletion (`user.deleted`)**

```ts
await db.delete(users).where(eq(users.clerkId, data.id))
```

* Deletes the user from the database based on `clerkId`.

---

### **Success Response**

```ts
return new Response('Webhook received', { status: 200 })
```

* Always respond with HTTP `200` to confirm the webhook was processed.

---

### **Summary of Flow**

1. Clerk triggers an event (user created, updated, or deleted).
2. Svix sends the event to our publicly exposed webhook URL (via ngrok).
3. Our Next.js/Bun backend:

   * Verifies the webhook signature.
   * Parses the event data.
   * Performs the corresponding DB operation in NeonDB.
4. Logs the event and responds with `200 OK`.

---

✅ **Key Takeaways**

* Webhooks automate syncing user data between Clerk and NeonDB.
* Svix ensures secure, verified webhook delivery.
* Ngrok is crucial for local development testing.
* Bun allows fast, concurrent local and public server runs.
