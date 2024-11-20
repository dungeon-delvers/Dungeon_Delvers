import { Router } from 'express'
import passport from 'passport'
import {
  createUser,
  generatePasswordHash,
  loginUser,
  userFromEmail,
  userFromUsername,
} from '../../models/user'
import { validateUser } from '../../models/validation'

export default (router: Router) => {
  router.post('/login', async (req, res, next) => {
    const result = await loginUser(req.body.username, req.body.password)
    if (result) {
      req.login(
        { ...result, username: req.body.username, password: req.body.password },
        async err => {
          if (err) {
            next(err)
          } else {
            try {
              passport.authenticate('LocalStrategy')(req, res, function () {
                delete result.passwordHash
                res.status(200).json(result)
              })
            } catch (error) {
              res.status(400).json({
                message: err.message,
              })
            }
          }
        },
      )
    } else {
      res.status(400).json({ message: 'Incorrect username or password.' })
    }
  })
  router.post('/signup', async (req, res) => {
    const { error } = validateUser(req.body)

    if (error) {
      return res.status(400).json({ message: error.message })
    } else {
      const { email, username, password } = req.body
      const emailExists = await userFromEmail(email)
      if (emailExists) {
        return res.status(409).json({ message: 'Email already exists' })
      }
      const usernameExists = await userFromUsername(username)
      if (usernameExists) {
        return res.status(409).json({ message: 'Username already exists' })
      }
      const passwordHash = await generatePasswordHash(password)
      const result = await createUser(email, passwordHash, username)
      if (result) {
        res.status(201).json({ message: 'User created' })
      } else {
        res.status(400).json({ message: 'User not created' })
      }
    }
  })
}
