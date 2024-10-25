import session from 'express-session'
import passport from 'passport'
import { pool } from './database/postgres'
import express from 'express'

type User = {
  id: number
  email: string
  password: string
}

export default (app: express.Application) => {
  app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      rolling: true,
      name: 'sid',
      cookie: {
        httpOnly: true,
        maxAge: 20 * 60 * 1000,
      },
    }),
  )

  passport.serializeUser((user, done) => {
    done(null, (user as User).id)
  })

  passport.deserializeUser(async (userId, done) => {
    const query = {
      text: 'SELECT * FROM users WHERE id = $1',
      value: [userId],
    }
    const { rows } = await pool.query(query)
    if (rows.length === 0) {
      return done(new Error('User not found'))
    }
    const user = rows[0]
    done(null, user)
  })
  app.use(passport.initialize())
  app.use(passport.session())
}
