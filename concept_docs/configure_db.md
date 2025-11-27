We will use Drizzle ORM.  

We have an application on Neon and followed the Drizzle with Neon setup.  

Basic file structure:  
```
<project root>
 ├ drizzle/
 ├ src/
 │  ├ db/
 │  │   └ schema.ts
 │  └ index.ts
 ├ .env
 ├ drizzle.config.ts
 ├ package.json
 └ tsconfig.json
```

### Steps  

1. Install packages:  
```bash
npm i drizzle-orm @neondatabase/serverless dotenv
npm i -D drizzle-kit tsx
```

2. Create `.env` file with:  
```
DATABASE_URL=your_neon_connection_string
```

3. Connect Drizzle ORM to Neon in `src/index.ts`:  
```ts
import { drizzle } from 'drizzle-orm/neon-http';

const db = drizzle(process.env.DATABASE_URL);
```

Alternatively with synchronous connection:  
```ts
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle({ client: sql });
```

4. Create `src/db/schema.ts` to define tables:  
```ts
import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  age: integer().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
});
```

5. Create `drizzle.config.ts`:  
```ts
import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
```

6. Apply schema changes quickly (for testing) with:  
```
npx drizzle-kit push
```

Alternatively generate and apply migrations:  
```
npx drizzle-kit generate
npx drizzle-kit migrate
```

7. Use your `src/index.ts` to seed and query the db:  
```ts
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/neon-http';
import { eq } from 'drizzle-orm';
import { usersTable } from './db/schema';

const db = drizzle(process.env.DATABASE_URL!);

async function main() {
  const user = {
    name: 'John',
    age: 30,
    email: 'john@example.com',
  };

  await db.insert(usersTable).values(user);
  console.log('New user created!');

  const users = await db.select().from(usersTable);
  console.log('All users:', users);

  await db
    .update(usersTable)
    .set({ age: 31 })
    .where(eq(usersTable.email, user.email));
  console.log('User updated!');

  await db.delete(usersTable).where(eq(usersTable.email, user.email));
  console.log('User deleted!');
}

main();
```

8. Run the script with:  
```
npx tsx src/index.ts
```

***

This keeps your original info intact but concise and easy to follow.  

For more, official Drizzle with Neon docs are helpful