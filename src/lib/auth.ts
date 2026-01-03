import { betterAuth } from 'better-auth'
import { Pool } from 'pg'

export const auth = betterAuth({
  database: new Pool({
    connectionString: process.env.DATABASE_URL,
  }),
  emailAndPassword: {
    enabled: true,
  },
  user: { modelName: 'better_auth_user' },
  session: { modelName: 'better_auth_session' },
  account: { modelName: 'better_auth_account' },
  verification: { modelName: 'better_auth_verification '}
})
