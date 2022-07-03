import { Strategy } from 'passport-jwt'
import { ExtractJwt } from 'passport-jwt'
import { jwtConfig } from '../config/jwt-config'
import User from '../models/User'

const option = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtConfig,
}

export default (passport: any): void => {
  passport.use(
    new Strategy(option, async (payload, done) => {
      try {
        const user = await User.findById(payload.userId);

        if (user) {
          done(null, user)
        } else {
          done(null, false)
        }
      } catch (e) {
        console.log(e)
      }
    }),
  )
}