import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey:
        'dzlkzezkuebzieubnzieuhziuebziuebziebzieubzieubzieubziuebzieubzuiebzuiebzuie',
    });
  }

  async validate(payload: any) {
    return payload;
  }
}
